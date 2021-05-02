const express = require('express');
const router = express.Router();
const conn = require('../database');
const multer = require('multer');
const path = require('path');

//Principal del user emprendedor
router.get('/mis-servicios', (req, res,next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}, (req, res) => {
    conn.query('SELECT * FROM servicio_emprendedor where correo = ?', [req.user.correo], (err, servicios) => {
        if (err) {
            res.json(err);
        }
        res.render('user.ejs', {
            data: servicios
        });
    });
});

// Registro de usuario
router.post('/registro', (req,res,next) => {
    conn.query('INSERT INTO usuario set ?', [req.body], (err, resp) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/');
    });
});

// Agregar servicio emprendedor
router.post('/agregar-servicio-emprendedor',(req, res, next) => {
    
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{

    let data = Object.assign({},req.body);
    let user = req.user.correo;
    conn.query('INSERT INTO servicio_emprendedor set ? ', {
        titulo: data.titulo,
        correo: user,
        descripcion: data.descripcion,
        ubicacion: data.ubicacion,
        contacto_tel: data.contacto_tel,
        img: req.file.filename,
        contacto_correo: data.contacto_correo,
        redsocial: data.redsocial,
        tipo: data.tipo
    }, (err, customer) => {
        res.redirect('/mis-servicios');
    });
});

// Cancela solicitud el emprendedor
router.get('/cancelar-servicio-emp/:id_emp', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_emp } = req.params;
        conn.query('DELETE FROM servicio_emprendedor WHERE id_emp = ?', [id_emp], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/mis-servicios');
    });
});

// enviamos el servicio a la vista modificar servicio emp
router.get('/modificar-servicio-emp/:id_emp', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_emp } = req.params;
        conn.query('SELECT * FROM servicio_emprendedor WHERE id_emp = ?', [id_emp], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.render('mod-servicios-emp', {
            data: rows[0]
        });
    });
});

// UPDATE de la modificacion del servicio emprendedor
router.post('/modificar-servicio-emp/:id_emp', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_emp } = req.params;
        const solicitud = { solicitud: 0};
        const newServicio = Object.assign(req.body,solicitud)
        conn.query('UPDATE servicio_emprendedor set ? WHERE id_emp = ?', [newServicio, id_emp], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/mis-servicios');
    });
});

module.exports = router;