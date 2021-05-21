const express = require('express');
const router = express.Router();
const conn = require('../database');

// home
router.get('/', (req, res) => {
    res.render('home.ejs', {
        usuario: req.user
    });
});

// servicios - home
router.get('/servicios-turisticos', (req, res) => {
    conn.query('SELECT * FROM servicio', (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('servicios.ejs', {
            usuario: req.user,
            data: data
        });
    });
});

// atractivos - home
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

// atractivos individual - home
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

// Servivios individual - home
router.get('/servicio/:id_servicio', (req, res) => {
    const { id_servicio } = req.params;
    conn.query('SELECT * FROM servicio WHERE id_servicio = ?', [id_servicio], (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('individual-emp.ejs', {
            usuario: req.user,
            data: data
        });
    });
});

module.exports = router;