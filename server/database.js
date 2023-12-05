const mysql = require('mysql2');

// below comments are to setup your local database

// SETUP ENV VARIABLES IN A .env FILE IN SAME SERVER DIRECTORY
// WRITE THEM AS SUCH: DB_PASSWORD = password

const connection = mysql.createConnection({

    host: 'dbembd.mysql.database.azure.com',
    user: 'root123',
    password: 'Admin123',
    database: 'embd',
    port: 3306
})

// connection.connect();
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});



module.exports = connection;

