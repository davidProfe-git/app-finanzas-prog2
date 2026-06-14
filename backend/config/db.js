const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'finanzas',
    port: 3307,
    password: ''
})

module.exports = pool.promise()