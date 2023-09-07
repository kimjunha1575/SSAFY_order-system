const mysql = require("mysql2/promise");
require('dotenv').config();
const pool = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PW,
	database: process.env.DB_SCHEMA,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = { pool };