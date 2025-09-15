//init db connection from W3Schools
const mysql = require('mysql2/promise');
//importing DOTENV library object (.config loads .env)
require('dotenv').config();
async function initDb() {
  const con = await mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  }) 
  return con;
}



module.exports = {initDb};