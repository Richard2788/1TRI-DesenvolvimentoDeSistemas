// npm i mysql2
const mysql = require('mysql2/promise')
const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '.env')
});

console.log('Diretório atual:', process.cwd());
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
})

module.exports = Object.freeze({
    pool: pool
})
