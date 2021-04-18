var mysql = require('mysql');
const { promisify }= require('util');


var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'turismo'
});

conn.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('CONEXION EXITOSA');
    }

});

conn.query = promisify(conn.query);
module.exports = conn;
