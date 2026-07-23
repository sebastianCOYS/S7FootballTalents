const express = require('express');
const { pool } = require('../db');
const { createHttpError } = require('../utils/httpError');
const router = express.Router();

const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

const validColumnsMap = {
    age: "age", mp: "mp", xg: "xG", xa: "xA", gls: "gls", ast: "ast",
    prgc: "prgc", prgp: "prgp", player: "player", pos: "pos", team: "Squad", league: "Comp",
};

const sortColumnsMap = {
    ...validColumnsMap,
    rk: "rk",
};

const numericFields = new Set(["age", "mp", "xg", "xa", "gls", "ast", "prgc", "prgp"]);
const textFields = new Set(["player", "pos", "team", "league"]);
const operatorMap = {
    gt: ">",
    gte: ">=",
    lt: "<",
    lte: "<=",
};

function parseFilterKey(key) {
    const parts = key.split("_");
    const potentialOperator = parts[parts.length - 1];
    const operator = Object.hasOwn(operatorMap, potentialOperator) ? operatorMap[potentialOperator] : null;

    if (operator) {
        return {
            field: parts.slice(0, -1).join("_"),
            operator,
        };
    }

    return {
        field: key,
        operator: "=",
    };
}

function parseNonNegativeInteger(value, parameter) {
    if (typeof value !== "string" || !/^\d+$/.test(value.trim())) {
        throw createHttpError(400, "INVALID_PARAMETER", `${parameter} must be a non-negative integer`, { parameter });
    }

    const number = Number(value);

    if (!Number.isSafeInteger(number)) {
        throw createHttpError(400, "INVALID_PARAMETER", `${parameter} must be a safe integer`, { parameter });
    }

    return number;
}

function parseLimit(value) {
    const limit = parseNonNegativeInteger(value, "limit");

    if (limit < 1 || limit > MAX_LIMIT) {
        throw createHttpError(400, "INVALID_PARAMETER", `limit must be between 1 and ${MAX_LIMIT}`, { parameter: "limit" });
    }

    return limit;
}

function parseSort(value) {
    if (typeof value !== "string" || value.trim() === "") {
        throw createHttpError(400, "INVALID_PARAMETER", "sort must be a supported field", { parameter: "sort" });
    }

    const descending = value.startsWith("-");
    const field = descending ? value.slice(1) : value;
    const column = Object.hasOwn(sortColumnsMap, field) ? sortColumnsMap[field] : null;

    if (!column) {
        throw createHttpError(400, "INVALID_PARAMETER", `Invalid sort field: ${field}`, { parameter: "sort" });
    }

    return {
        column,
        direction: descending ? "DESC" : "ASC",
    };
}

function isValidNumber(value) {
    if (typeof value !== "string") return false;

    const trimmedValue = value.trim();
    if (trimmedValue === "") return false;
    if (!/^[+]?\d+([.]\d+)?$/.test(trimmedValue)) return false;

    const number = Number(trimmedValue);
    return Number.isFinite(number) && number >= 0;
}

//GET /players with optional filters, sorting, and pagination
router.get('/', async (req, res, next) => {
    try {
        const offset = parseNonNegativeInteger(req.query.offset ?? "0", "offset");
        const limit = parseLimit(req.query.limit ?? String(DEFAULT_LIMIT));
        const sort = parseSort(req.query.sort ?? "rk");

        let sql = "SELECT * FROM players_24_25 WHERE 1=1";
        const params = [];

        for (const [rawParameter, value] of Object.entries(req.query)) {
            if (["offset", "limit", "sort"].includes(rawParameter)) continue;

            if (typeof value !== "string") {
                return next(createHttpError(400, "INVALID_PARAMETER", `${rawParameter} must have one value`, { parameter: rawParameter }));
            }

            const { field, operator } = parseFilterKey(rawParameter);
            const columnName = Object.hasOwn(validColumnsMap, field) ? validColumnsMap[field] : null;

            if (!columnName) {
                return next(createHttpError(400, "INVALID_PARAMETER", `Invalid parameter: ${rawParameter}`, { parameter: rawParameter }));
            }

            if (numericFields.has(field)) {
                if (!isValidNumber(value)) {
                    return next(createHttpError(400, "INVALID_PARAMETER", `${rawParameter} must be a non-negative number`, { parameter: rawParameter }));
                }

                sql += ` AND ${columnName} ${operator} ?`;
                params.push(Number(value));
                continue;
            }

            if (textFields.has(field)) {
                if (operator !== "=") {
                    return next(createHttpError(400, "INVALID_PARAMETER", `${rawParameter} does not support comparison operators`, { parameter: rawParameter }));
                }

                const trimmedValue = value.trim();
                if (trimmedValue === "") continue;

                if (trimmedValue.length > 100) {
                    return next(createHttpError(400, "INVALID_PARAMETER", `${rawParameter} must be 100 characters or fewer`, { parameter: rawParameter }));
                }

                if (field === "player") {
                    sql += ` AND ${columnName} LIKE ?`;
                    params.push(`%${trimmedValue}%`);
                } else {
                    sql += ` AND ${columnName} = ?`;
                    params.push(trimmedValue);
                }
            }
        }

        sql += ` ORDER BY ${sort.column} ${sort.direction}`;
        if (sort.column !== "rk") {
            sql += ", rk ASC";
        }

        sql += " LIMIT ? OFFSET ?";
        params.push(limit + 1, offset);

        const [rows] = await pool.execute(sql, params);
        const hasNextPage = rows.length > limit;
        const hasPreviousPage = offset > 0;
        const players = hasNextPage ? rows.slice(0, limit) : rows;

        return res.status(200).json({
            data: players,
            pagination: {
                limit,
                offset,
                hasNextPage,
                hasPreviousPage,
                nextOffset: hasNextPage ? offset + limit : null,
                previousOffset: hasPreviousPage ? Math.max(0, offset - limit) : null,
            }
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
