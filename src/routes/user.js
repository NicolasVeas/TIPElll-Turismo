const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/usuario', (req, res) => {
    res.render('user.ejs');
});

// Agregar servicio emprendedor
router.post('/agregar-servicio-emprendedor', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{

    let data = Object.assign({},req.body);
    let user = req.user.correo;
    console.log(data);
    console.log(user);
    conn.query('INSERT INTO servicio_emprendedor set ? ', {
        titulo: data.titulo,
        correo: user,
        descripcion: data.descripcion,
        ubicacion: data.ubicacion,
        contacto_tel: data.contacto_tel,
        contacto_correo: data.contacto_correo,
        redsocial: data.redsocial,
        tipo: data.tipo
    }, (err, customer) => {
        res.redirect('/usuario');
    });
});

module.exports = router;