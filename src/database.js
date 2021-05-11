var mysql = require('mysql');


var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'turismo'
});

conn.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('CONEXIÓN EXITOSA');
    }

});

module.exports = conn;
