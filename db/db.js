const mysql = require('mysql');
const configuration = require('../config')


const connection = mysql.createConnection({
    host: configuration.db.host,
    user: configuration.db.user,
    password: configuration.db.password,
    database: configuration.db.database,
    port: configuration.db.port
});

connection.connect();


module.exports = connection;
