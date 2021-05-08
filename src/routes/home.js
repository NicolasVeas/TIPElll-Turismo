const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/', (req, res) => {
    res.render('home.ejs', {
        usuario: req.user
    });
});

router.get('/servicios-turisticos', (req, res) => {
    conn.query('SELECT * FROM servicio_admin', (err, atractivos) => {
        if (err) {
            res.json(err);
        }
        res.render('servicios.ejs', {
            usuario: req.user,
            data: atractivos
        });
    });
});

router.get('/atractivos-turisticos', (req,res,next) => {
    conn.query('SELECT * FROM atractivo_admin', (err, atractivos) => {
        if (err) {
            res.json(err);
        }
        res.render('atractivos.ejs', {
            usuario: req.user,
            data: atractivos
        });
    });
});

module.exports = router;