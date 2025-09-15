const express = require('express');
const {initDb} = require('../db');
const router = express.Router();
router.get('/' , async (req, res) => {
    try {
    const con = await initDb();
    //RN destructuring req.query into variables(loop later pls)... (fix later, just a proof of concept)
    const {age, mp, gls, ast, prgc, prgp } = req.query;

    //implement later
    //('_' is there just to prevent accidental collisions with column names)
    //_gt = greater than
    //_lt= less than
    //_gte = greater than OR equal to
    //_lte = less than OR equal to

    //base query
    let sql = "select * from players_24_25 WHERE 1=1";
    let params = [];
     
    //validSearch = at least one search parameter was provided
    let validSearch = false;

    if (age) {
        sql += " AND age = ?";
        params.push(age);
        validSearch = true;
    }

    if (mp) {
        sql += " AND mp = ?";
        params.push(mp);
        validSearch = true;
    }

    if (gls) {
        sql += " AND gls = ?";
        params.push(gls);
        validSearch = true;
    }
    if (ast) {
        sql += " AND ast = ?";
        params.push(ast);
        validSearch = true;
    }
    if (prgc) {
        sql += " AND prgc = ?";
        params.push(prgc);
        validSearch = true;
    }
    if (prgp) {
        sql += " AND prgp = ?";
        params.push(prgp);
        validSearch = true;
    }

    //limiting the number of results to 20 regardless of the user input
    //(as long as at least one search parameter was provided)
    if (validSearch == true) {
        sql += " limit 20";
    } else {
        //status is more flexible than sendStatus
        res.status(404).json({error: "At least one search parameter must be provided"});
        //invalid query, no need to continue, so we return
        return;
    }
    const [rows] = await con.execute(sql, params);
    if (rows.length > 0) {
    res.json(rows);
  } else {
    res.sendStatus(404);
  }
    } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

})
module.exports = router;