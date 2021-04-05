const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const app = express();

//  Importando rutas
const customerRout = require('./routes/customer');
const loginRout = require('./routes/login');
const { urlencoded } = require('express');

//  Rutas
app.use('/', customerRout);
app.use('/', loginRout);

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

//  Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});