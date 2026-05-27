const mysql = require('mysql2')

const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '1234',
        port: 3308,
        database: 'finanzas'
    }
)

module.exports = pool.promise()

