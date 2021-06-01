const express = require('express');
const router = express.Router();
const conn = require('../database');

router.get('/x', (req, res) => {
    conn.query('SELECT * FROM servicio', (err, servicio) => {
        conn.query('SELECT * FROM atractivo_admin', (err, atractivo) => {
            conn.query('SELECT * FROM categoria', (err, categoria) => {
                conn.query('SELECT * FROM subcategoria', (err, subcategoria) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('x.ejs', {
                        usuario: req.user,
                        dataServicio: servicio,
                        dataAtractivo: atractivo,
                        dataCategoria: categoria,
                        dataSubcategoria: subcategoria
                    });
                });
            });
        });
    });
});

router.get('/x2', (req, res) => {
    conn.query('SELECT * FROM servicio', (err, data) => {
        conn.query('SELECT * FROM categoria', (err, categoria) => {
            conn.query('SELECT * FROM subcategoria', (err, subcategoria) => {
                if (err) {
                    res.json(err);
                }
                res.render('x2.ejs', {
                    usuario: req.user,
                    data: data,
                    dataCategoria: categoria,
                    dataSubcategoria: subcategoria
                });
            });
        });
    });
});

router.get('/x3', (req,res,next) => {
    conn.query('SELECT * FROM atractivo_admin', (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('x3.ejs', {
            usuario: req.user,
            data: data
        });
    });
});


// home

router.get('/', (req, res) => {
    conn.query('SELECT * FROM servicio', (err, servicio) => {
        conn.query('SELECT * FROM atractivo_admin', (err, atractivo) => {
            conn.query('SELECT * FROM categoria', (err, categoria) => {
                conn.query('SELECT * FROM subcategoria', (err, subcategoria) => {
                    if (err) {
                        res.json(err);
                    }
                    res.render('home.ejs', {
                        usuario: req.user,
                        dataServicio: servicio,
                        dataAtractivo: atractivo,
                        dataCategoria: categoria,
                        dataSubcategoria: subcategoria
                    });
                });
            });
        });
    });
});

// servicios - home
router.get('/servicios-turisticos', (req, res) => {
    conn.query('SELECT * FROM servicio', (err, data) => {
        conn.query('SELECT * FROM categoria', (err, categoria) => {
            conn.query('SELECT * FROM subcategoria', (err, subcategoria) => {
                if (err) {
                    res.json(err);
                }
                res.render('servicios.ejs', {
                    usuario: req.user,
                    data: data,
                    dataCategoria: categoria,
                    dataSubcategoria: subcategoria
                });
            });
        });
    });
});

// atractivos - home
router.get('/atractivos-turisticos', (req,res,next) => {
    conn.query('SELECT * FROM atractivo_admin', (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('atractivos.ejs', {
            usuario: req.user,
            data: data
        });
    });
});

// atractivos individual - home
router.get('/atractivo/:id_atractivo', (req, res) => {
    const { id_atractivo } = req.params;
    conn.query('SELECT * FROM atractivo_admin WHERE id_atractivo = ?', [id_atractivo], (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('x4.ejs', {
            usuario: req.user,
            data: data
        });
    });
});

// Servivios individual - home
router.get('/servicio/:id_servicio', (req, res) => {
    const { id_servicio } = req.params;
    conn.query('SELECT * FROM servicio WHERE id_servicio = ?', [id_servicio], (err, data) => {
        if (err) {
            res.json(err);
        }
        res.render('x5.ejs', {
            usuario: req.user,
            data: data
        });
    });
});

module.exports = router;