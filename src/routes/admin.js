const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
    res.render('admin.ejs');
});


router.get('/servicios', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer', (err, customer) => {
            res.render('admin-servicios', {
                data: customer
            });
        });
    });
});

module.exports = router;