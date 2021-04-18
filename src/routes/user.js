const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/user', (req, res) => {
    res.render('user.ejs');
});

module.exports = router;