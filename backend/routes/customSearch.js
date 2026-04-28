const express = require('express');
const {pool} = require('../db');
const router = express.Router();

function isValidNumber(value) {
        const trimmedVal = String(value).trim();
        if (trimmedVal === '') return false;
        if (!/^[+]?\d+([.]\d+)?$/.test(trimmedVal)) return false;
        const number = Number(trimmedVal);
        if (isFinite(number) === false) return false;
        if (number < 0) return false;
        return true;
    }

//custom search endpoint
router.get('/' , async (req, res, next) => {


    try {

    //defining valid query parameters
    const validParams = ['offset','age', 'mp', 'gls', 'ast', 'prgc', 'prgp', 'player', 'pos', 'team', 'league'];
    const queryEntries = Object.entries(req.query);
    
    let sql = "select * from players_24_25 WHERE 1=1";
    let params = [];
    let hasNextPage = false;
    let hasPreviousPage = false;
    //check for invalid parameters
    let validSearch = false;

    for (let [param, value] of queryEntries) {
        if (param === "offset") {continue};
        if (!validParams.includes(param)) {
            const error = new Error(`Invalid parameter: ${param}`);
            error.status = 400;
            return next(error);
        }
        if (value == null) {
            const error = new Error(`value of parameter: ${param} cannot be null or undefined`);
            error.status = 400;
            return next(error);
        }
        if (param != null) {
            if (isValidNumber(value) === false && param !== 'player' && param !== 'pos' && param !== 'team' && param !== 'league') {
                const error = new Error(`${param} must be a number`);
                error.status = 400;
                return next(error);
            }
            if (param === 'player') {
                sql += " AND player LIKE ?";
                params.push(`%${value}%`);
            } else {
                sql+= ` AND ${param} = ?`;
                params.push(value);
            }
            validSearch = true;
        }
    }
    
   
    //implement later
    //('_' is there just to prevent accidental collisions with column names)
    //_gt = greater than
    //_lt= less than
    //_gte = greater than OR equal to
    //_lte = less than OR equal to

    

    //limiting the number of results regardless of the user input
    //(as long as at least one search parameter was provided)
    if (validSearch !== true) {
        const error = new Error(`At least one search parameter must be provided`);
        error.status = 400;
        return next(error);
    }
    if (req.query.offset != null) {
        params.push(req.query.offset);
    } else {
        params.push(0);
    }
    sql += "\x20LIMIT 11 OFFSET ?";
    const [rows] = await pool.execute(sql, params);

    if (rows.length === 0) {
        return res.status(200).json({
            success: true,
            data: {
                players: [],
                hasNextP    : false,
                hasPreviousPage: false,
                message: "No players found",

            },
        });
    }
    
    
    if (Number(req.query.offset) > 0) {
        hasPreviousPage = true;
    }
    if(rows.length > 10) {
    //removing 11th element
    hasNextPage = true;
    const popped = rows.splice(-1);
    }
    return res.status(200).json({
        success: true,
        data: {
            players: rows,
            hasPreviousPage: hasPreviousPage,
            hasNextPage: hasNextPage,
            
        } 
    });
    } catch (error) {
        next(error);
  };
});
module.exports = router;

