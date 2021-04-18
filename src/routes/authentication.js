const express = require('express');
const router = express.Router();
const conn = require('..');
const passport = require('passport');
const { changeUser } = require('..');




router.get('/login', (req,res) =>{
    res.render('home.ejs');
});

router.post('/login', passport.authenticate('local',{
    
    failureRedirect: "/xd",
}), (req,res) => {
    console.log(req.user.tipo);
    if(req.user.tipo == 'emprendedor'){
        res.redirect('/usuario');
    }else if(req.user.tipo == 'admin'){
        res.redirect('/administracion');
    }else{
        res.redirect('/asd');
    }
});

module.exports = router;