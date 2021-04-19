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
        res.redirect('/');
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

router.get('/eliminar/:correo', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { correo} = req.params;
        conn.query('DELETE FROM usuario WHERE correo = ?', [correo], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/usuarios');
    });
});


// Fin apartado de USUARIOS

/* -------------------------------------- */

// Apartado de SERVICIOS

    // SERVICIOS REGIONALES

    router.get('/servicios-regionales', (req,res,next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
        conn.query('SELECT * FROM servicio_admin', (err, servicios) => {
            if (err) {
                res.json(err);
            }
            res.render('servicios-reg', {
                data: servicios
            });
        });
    });

    router.post('/agregar-servicio', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
        let data = Object.assign({},req.body);
        let user = req.user.correo;
        console.log(user);

        conn.query('INSERT INTO servicio_admin set ? ', {
            titulo: data.titulo,
            correo: user,
            descripcion: data.descripcion,
            geo_local: data.geo_local,
            telefono: data.telefono
        }, (err, customer) => {
            res.redirect('/servicios-regionales');
        });
    });

    router.get('/eliminar-servicio-reg/:id_servicio', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
            const { id_servicio } = req.params;
            conn.query('DELETE FROM servicio_admin WHERE id_servicio = ?', [id_servicio], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/servicios-regionales');
        });
    });
    
    router.get('/modificar-servicio-reg/:id_servicio', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
            const { id_servicio } = req.params;
            conn.query('SELECT * FROM servicio_admin WHERE id_servicio = ?', [id_servicio], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.render('mod-servicios-reg', {
                data: rows[0]
            });
        });
    });
    
    router.post('/modificar-servicio-reg/:id_servicio', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
            const { id_servicio } = req.params;
            const newServicio = Object.assign({},req.body)
            conn.query('UPDATE servicio_admin set ? WHERE id_servicio = ?', [newServicio, id_servicio], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/servicios-regionales');
        });
    });

    // Fin SERVICIOS REGIONALES

    ///////////////////////////

    // SERVICIOS DE USUARIOS


    router.get('/servicios-usuarios', (req,res,next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
        conn.query('SELECT * FROM servicio_admin', (err, servicios) => {
            if (err) {
                res.json(err);
            }
            res.render('servicios-user', {
                data: servicios
            });
        });
    });

    //  Fin SERVICIOS DE USUSARIOS

// Fin apartado de SERVIVCIOS

/* -------------------------------------- */

// Apartado de ATRACTIVOS REGIONALES

router.get('/atractivos-regionales', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
    conn.query('SELECT * FROM atractivo_admin', (err, atractivos) => {
        if (err) {
            res.json(err);
        }
        res.render('atractivos-reg', {
            data: atractivos
        });
    });
});

router.post('/agregar-atractivo', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
    conn.query('INSERT INTO atractivo_admin set ?', [req.body], (err, resp) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/atractivos-regionales');
    });
});

router.get('/eliminar-atractivo-reg/:id_atractivo', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_atractivo } = req.params;
        conn.query('DELETE FROM atractivo_admin WHERE id_atractivo = ?', [id_atractivo], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/atractivos-regionales');
    });
});

router.get('/modificar-atractivo-reg/:id_atractivo', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_atractivo } = req.params;
        conn.query('SELECT * FROM atractivo_admin WHERE id_atractivo = ?', [id_atractivo], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.render('mod-atractivos-reg', {
            data: rows[0]
        });
    });
});

router.post('/modificar-atractivo-reg/:id_atractivo', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { id_atractivo } = req.params;
        const newAtractivo = Object.assign({},req.body)
        conn.query('UPDATE atractivo_admin set ? WHERE id_atractivo = ?', [newAtractivo, id_atractivo], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/atractivos-regionales');
    });
});

// Fin apartado de ATRACTIVOS REGIONALES

/* -------------------------------------- */


module.exports = router;