const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();
const { urlencoded } = require('express');

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'static')));

//  Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: '3306',
    database: 'tipe'
}, 'single'));

app.use(express.urlencoded({extended:false}));

//  Rutas
app.use('/', require('./routes/home'));         // pág principal
app.use('/', require('./routes/customer'));     // asdasdasdasd
app.use('/', require('./routes/user'));         // pág usuario
app.use('/', require('./routes/admin'));        // pág administrador

//  Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});