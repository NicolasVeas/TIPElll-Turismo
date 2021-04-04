const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/', (req, res) => {
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM customer', (err, customers) => {
            if (err) {
                res.json(err);
            }
            res.render('customers', {
                data: customers
            });
        });
    });
});

router.post('/add', (req, res) => {
    const data = Object.assign({},req.body)
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            res.redirect('/');
        });
    });
});

router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    });
});

router.get('/update/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            res.render('customer_update', {
                data: customer[0]
            });
        });
    });
});

router.post('/update/:id', (req, res) => {
    const { id } = req.params;
    const newCustomer = Object.assign({},req.body)
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/');
        });
    });
});

module.exports = router;