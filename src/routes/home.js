const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/test', (req,res,next) => {
    conn.query('SELECT * FROM atractivo_admin', (err, atractivos) => {
        console.log(atractivos[0].geo_local);
        if (err) {
            res.json(err);
        }
        res.render('x.ejs', {
            data: atractivos
        });
    });
});

router.get('/', (req, res) => {
    res.render('home.ejs', {
        data: req.user
    });
});

router.get('/servicios-turisticos', (req, res) => {
    res.render('servicios.ejs', {
        data: req.user
    });
});

router.get('/atractivos-turisticos', (req, res) => {
    res.render('atractivos.ejs', {
        data: req.user
    });
});

module.exports = router;