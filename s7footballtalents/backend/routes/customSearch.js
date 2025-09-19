const express = require('express');
const {initDb} = require('../db');
const router = express.Router();

//custom search endpoint
router.get('/' , async (req, res) => {

    function isValidNumber(value) {
        const trimmedVal = String(value).trim();
        if (trimmedVal === '') return false;
        if (!/^[+]?\d+([.]\d+)?$/.test(trimmedVal)) return false;
        const number = Number(trimmedVal);
        if (isFinite(number) == false) return false;
        if (number < 0) return false;
        return true;
    }
    try {
    const con = await initDb();
    //RN destructuring req.query into variables(  later pls)... (fix later, just a proof of concept for testing)
    const {age, mp, gls, ast, prgc, prgp } = req.query;

    //defining valid query parameters
    const validParams = ['age', 'mp', 'gls', 'ast', 'prgc', 'prgp'];
    const queryParams = Object.keys(req.query);

    //check for invalid parameters
    for (let param of queryParams) {
        if (!validParams.includes(param)) {
            res.status(400).json({error: `Invalid parameter: ${param}`});
            return;
        }
    }
    
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
        if (isValidNumber(age) == false) {
            res.status(400).json({error: "Age must be a number"});
            return;
        }
        sql += " AND age = ?";
        params.push(age);
        validSearch = true;
    }

    if (mp) {
        if (isValidNumber(mp) == false) {
            res.status(400).json({error: "mp must be a number"});
            return;
        }
        sql += " AND mp = ?";
        params.push(mp);
        validSearch = true;
    }

    if (gls) {
        if (isValidNumber(gls) == false) {
            res.status(400).json({error: "gls must be a number"});
            return;
        }
        sql += " AND gls = ?";
        params.push(gls);
        validSearch = true;
    }
    if (ast) {
        if (isValidNumber(ast) == false) {
            res.status(400).json({error: "ast must be a number"});
            return;
        }
        sql += " AND ast = ?";
        params.push(ast);
        validSearch = true;
    }
    if (prgc) {
        if (isValidNumber(prgc) == false) {
            res.status(400).json({error: "prgc must be a number"});
            return;
        }
        sql += " AND prgc = ?";
        params.push(prgc);
        validSearch = true;
    }
    if (prgp) {
        if (isValidNumber(prgp) == false) {
            res.status(400).json({error: "prgp must be a number"});
            return;
        }
        sql += " AND prgp = ?";
        params.push(prgp);
        validSearch = true;
    }

    //limiting the number of results regardless of the user input
    //(as long as at least one search parameter was provided)
    if (validSearch == true) {
        sql += " limit 10";
    } else {
        //status is more flexible than sendStatus
        res.status(400).json({error: "At least one search parameter must be provided"});
        return;
    }
    const [rows] = await con.execute(sql, params);
    if (rows.length > 0) {
    res.status(200).json(rows);
    return;
  } else {
    res.status(404).json({error: "No players found"});
    return;
  }
    } catch (err) {
    console.error(err);
    res.status(500).json({error: "Internal server error"});
    return;
  }

})
module.exports = router;