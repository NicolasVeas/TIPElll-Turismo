const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/', (req, res) => {
    res.render('home.ejs');
});

module.exports = router;