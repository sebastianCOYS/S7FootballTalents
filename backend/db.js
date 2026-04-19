//init db connection from W3Schools
const mysql = require('mysql2/promise');
//importing DOTENV library object (.config loads .env)
require('dotenv').config();
  const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
  });

module.exports = { pool };