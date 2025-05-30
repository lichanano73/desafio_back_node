const mysql  = require('mysql');
const config = require('../../config/config');

const pool = mysql.createPool({
    host:       config.db.host,
    user:       config.db.user,
    password:   config.db.password,
    database:   config.db.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;