const express = require('express');
const {pool} = require('../db');
const router = express.Router();

//no need for "/players" here, it's already mounted in backend.js
//GET ALL player information by rk (GET player profile info)
router.get('/rk/:rk', async (req,res) => {
    try {
    const {rk} = req.params;
    const [rows] = await pool.execute("select * from players_24_25 where rk = ?", [rk]);
    if (rows.length === 0) { 
      const error = new Error(`player with rk ${rk} not found`);
      error.status = 404;
      return next(error);
    };

    res.status(200).json({
      success: true,
      data: {
        player: rows[0],
      } 
    });

  } catch (error) {
    next(error);
  } 
});



module.exports = router;