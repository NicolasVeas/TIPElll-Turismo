const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/admin', (req, res, next) => {
    if(req.isAuthenticated()){
        if(req.user.tipo == 'emprendedor' ){
            res.redirect('/usuario');
        }
        else{
            res.redirect('/usuarios-admin');
        }
        return next();
    }
        res.redirect('/');
});

//* -------------------------------------- *//

// Apartado de USUARIOS

router.get('/usuarios-admin', (req,res,next) => {
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
        res.redirect('/usuarios-admin');
    });
});

router.get('/aceptar-usuario/:correo', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { correo } = req.params;
        conn.query("UPDATE usuario SET estado = 1 WHERE correo = ?", [correo], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/usuarios-admin');
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
        

        conn.query('INSERT INTO servicio_admin set ? ', {
            titulo: data.titulo,
            correo: user,
            img: req.file.filename,
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
        conn.query('SELECT * FROM servicio_emprendedor', (err, servicios) => {
            if (err) {
                res.json(err);
            }
            res.render('servicios-user', {
                data: servicios
            });
        });
    });

    router.get('/eliminar-servicio-user/:id_emp', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
            const { id_emp } = req.params;
            conn.query('DELETE FROM servicio_emprendedor WHERE id_emp = ?', [id_emp], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/servicios-usuarios');
        });
    });

    router.get('/aceptar-servicio/:id_emp', (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
            res.redirect('/');
        },(req,res) =>{
            const { id_emp } = req.params;
            conn.query("UPDATE servicio_emprendedor SET solicitud = 1 WHERE id_emp = ?", [id_emp], (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/servicios-usuarios');
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
    let data = Object.assign({},req.body);
    let user = req.user.correo;
    conn.query('INSERT INTO atractivo_admin set ?', {
        titulo: data.titulo,
        correo: user,
        descripcion: data.descripcion,
        geo_local: data.geo_local,
        telefono: data.telefono,
        img: req.file.filename
    }, (err, resp) => {
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

// CATEGORIAS

router.get('/administrar-categorias', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
    conn.query('SELECT * FROM categoria', (err, resp1) => {
        if (err) {
            res.json(err);
        }else{
            conn.query('SELECT * FROM subcategoria', (err, resp2) => {
                if (err) {
                    res.json(err);
                }
                res.render('admin-categorias', {
                    datacat: resp1,
                    datasubcat: resp2
                });
            });
        }
    });
});

router.post('/agregar-categoria', (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
    let data = Object.assign({},req.body);
    conn.query('INSERT INTO categoria set ?', {
        nombre_cat: data.nombre_cat,
    }, (err, resp) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/administrar-categorias');
    });
});

router.get('/eliminar-categoria/:nombre_cat', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const { nombre_cat } = req.params;
        conn.query('DELETE FROM categoria WHERE nombre_cat = ?', [nombre_cat], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/administrar-categorias');
    });
});

router.post('/modificar-categoria', (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
    },(req,res) =>{
        const newCus = req.body;
        conn.query('UPDATE categoria set nombre_cat = ? WHERE nombre_cat = ?', [newCus.new_nombre_cat,newCus.nombre_cat], (err, rows) => {
        if (err) {
            res.json(err);
        }
        res.redirect('/administrar-categorias');
    });
});

// Fin apartado de Categorías

/* -------------------------------------- */

module.exports = router;