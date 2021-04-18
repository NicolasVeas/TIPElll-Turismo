const express = require('express');
const router = express.Router();
const conn = require('..');
const passport = require('passport');
const { changeUser } = require('..');


router.post('/login', passport.authenticate('local',{
    
    failureRedirect: "/",
}), (req,res) => {
    if(req.user.tipo == 'emprendedor'){
        res.redirect('/usuario');
    }else if(req.user.tipo == 'admin'){
        res.redirect('/admin');
    }else{
        res.redirect('/');
    }
});

module.exports = router;