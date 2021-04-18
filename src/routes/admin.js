const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/admin', (req, res) => {
    res.render('admin.ejs');
});

//* -------------------------------------- *//

// Apartado de USUARIOS

router.get('/usuarios', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/login');
    },(req,res) =>{
    conn.query('SELECT * FROM usuario', (err, usuarios) => {
        if (err) {
            res.json(err);
        }
        res.render('admin-user', {
            data: usuarios
        });
    });
});

router.get('/eliminar/:correo', (req, res) => {
    const { correo } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM usuario WHERE correo = ?', [correo], (err, rows) => {
            res.redirect('/admin');
        });
    });
});


// Fin apartado de USUARIOS

/* -------------------------------------- */

// Apartado de SERVICIOS

    // SERVICIOS REGIONALES

    router.get('/servicios-regionales', (req, res) => {
        req.getConnection((err, conn) =>{
            conn.query('SELECT * FROM servicio_admin', (err, servicios) => {
                if (err) {
                    res.json(err);
                }
                res.render('servicios-reg', {
                    data: servicios
                });
            });
        });
    });

    router.post('/agregar-servicio', (req, res) => {
        const data = Object.assign({},req.body)
        req.getConnection((err, conn) => {
            conn.query('INSERT INTO servicio_admin set ?', [data], (err, customer) => {
                res.redirect('/servicios-regionales');
            });
        });
    });

    // Fin SERVICIOS REGIONALES

    ///////////////////////////

    // SERVICIOS DE USUARIOS

    router.get('/servicios-usuarios', (req, res) => {
        req.getConnection((err, conn) =>{
            conn.query('SELECT * FROM servicio_emprendedor', (err, servicios) => {
                if (err) {
                    res.json(err);
                }
                res.render('servicios-user', {
                    data: servicios
                });
            });
        });
    });

    //  Fin SERVICIOS DE USUSARIOS

// Fin apartado de SERVIVCIOS

/* -------------------------------------- */

//
router.post('/agregar', (req, res) => {
    const data = Object.assign({},req.body)
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuario set ?', [data], (err, customer) => {
            res.redirect('/admin');
        });
    });
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