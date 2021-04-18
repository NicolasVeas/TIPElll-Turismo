const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const app = express();
const { urlencoded } = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassportLocal = require('passport-local').Strategy;

const conn = require('./database');
// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'static')));

//  Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('el secreto'));
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
    secret: 'el secreto',
    resave: true, //la sesión se guardar cada vez
    saveUninitialized: true    //Si inicializamos y no le guardamos nada igual va a guardar
}));

passport.use(new PassportLocal(function (username, password, done) {
    var correo = username;
    var contrasena = password;
    //console.log(username)// callback with email and password from our form
    console.log(correo + " - " + contrasena);
    conn.query("SELECT * FROM `usuario` WHERE `correo` = '" + correo + "'", function (err, rows) {
        console.log(rows[0].contrasena + " - " + rows[0].correo);
        if (err)
            return done(err);
        if (!rows.length) {
            return done(null, false);
        }
        if (!(rows[0].contrasena == contrasena))
            return done(null, false);
        //console.log(rows[0].password + " y " + password);
        //console.log(rows[0].rut + " y " + username)
        return done(null, { id: rows[0].correo, name: rows[0].nombre, tipo: rows[0].tipo });

    });
}));
//Serialización, parar la información para identificar usuario en passport
passport.serializeUser(function (user, done) {
    //console.log(user)
    done(null, user.id);
});
//Deserializacion
passport.deserializeUser(function (id, done) {
    //console.log(id) 
    done(null, { id: 1, name: "Cody" });
});

//  Rutas
app.use('/', require('./routes/home'));         // pág principal
app.use('/', require('./routes/customer'));     // pág 
app.use('/', require('./routes/user'));         // pág usuario
app.use('/', require('./routes/admin'));        // pág administrador
app.use('/', require('./routes/authentication')); // login - sign up

//  Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});