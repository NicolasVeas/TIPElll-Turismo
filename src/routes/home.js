const express = require('express');
const router = express.Router();
const conn = require('../database');

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