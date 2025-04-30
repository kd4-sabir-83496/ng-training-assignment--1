const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Fuggi', 
  database: 'todoapp'
});

module.exports = pool.promise();
