const express = require('express');
const router = express.Router();
const conn = require('../database');

// Pruebas

router.get('/', (req, res) => {
    res.render('home.ejs', {
        usuario: req.user
    });
});

router.get('/servicios-turisticos', (req, res) => {
    conn.query('SELECT * FROM servicio_admin', (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('servicios.ejs', {
            usuario: req.user,
            data: data
        });
    });
});

router.get('/atractivos-turisticos', (req,res,next) => {
    conn.query('SELECT * FROM atractivo_admin', (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('atractivos.ejs', {
            usuario: req.user,
            data: data
        });
    });
});

router.get('/atractivo/:id_atractivo', (req, res) => {
    const { id_atractivo } = req.params;
    conn.query('SELECT * FROM atractivo_admin WHERE id_atractivo = ?', [id_atractivo], (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('individual.ejs', {
            usuario: req.user,
            data: data
        });
    });
});

module.exports = router;