const express = require('express');
const router = express.Router();
const conn = require('../database');

// router.get('/admin', (req, res) => {
//     req.getConnection((err, conn) =>{
//         conn.query('SELECT * FROM customer', (err, customers) => {
//             if (err) {
//                 res.json(err);
//             }
//             res.render('admin', {
//                 data: customers
//             });
//         });
//     });
// });

// Pruebas

// Fin pruebas


router.post('/add', (req, res) => {
    const data = Object.assign({},req.body)
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            res.redirect('/admin');
        });
    });
});

router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/admin');
        });
    });
});

// router.get('/usuarios', (req, res) => {
//     const { id } = req.params;
//     req.getConnection((err, conn) => {
//         conn.query('SELECT * FROM customer', (err, customer) => {
//             res.render('admin-user', {
//                 data: customer
//             });
//         });
//     });
// });

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
            res.redirect('/admin');
        });
    });
});

module.exports = router;