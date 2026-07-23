const express = require('express');
const { pool } = require('../db');
const { createHttpError } = require('../utils/httpError');
const router = express.Router();

//GET /players/:rk - retrieve one player by id (thats rk in db)
router.get('/:rk', async (req, res, next) => {
  try {
    const { rk } = req.params;

    //REGEX checking that if it ISNT all just digits
    if (!/^\d+$/.test(rk) || Number(rk) < 1) {
      return next(createHttpError(400, "INVALID_PLAYER_ID", "rk must be a positive integer", { parameter: "rk" }));
    }

    const [rows] = await pool.execute("SELECT * FROM players_24_25 WHERE rk = ?", [Number(rk)]);

    if (rows.length === 0) {
      return next(createHttpError(404, "PLAYER_NOT_FOUND", `Player with rk ${rk} was not found`, { rk: Number(rk) }));
    }

    return res.status(200).json({
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
