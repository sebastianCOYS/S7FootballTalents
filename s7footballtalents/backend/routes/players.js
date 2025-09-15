const express = require('express');
const {initDb} = require('../db');
const router = express.Router();

//no need for "/players" here, it's already mounted in backend.js
//GET ALL player information by rk (GET player profile info)
router.get('/rk/:rk', async (req,res) => {
    try {
    const con = await initDb();
    const rk = req.params.rk;
    const [rows] = await con.execute("select * from players_24_25 where rk = ?", [rk]);
    if (rows.length > 0) {
    res.json(rows);
  } else {
    res.sendStatus(404);
  }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
//GET by name (search player name) % means "any string" as long as name is in there somewhere 
router.get('/name/:name', async (req, res) => {
    try {
        const con = await initDb();
        const name = req.params.name;
        const [rows] = await con.execute("select * from  players_24_25 WHERE Player LIKE ? LIMIT 20", ["%" + name +"%"]);
        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.sendStatus(404);
        }
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
    }
});


module.exports = router;