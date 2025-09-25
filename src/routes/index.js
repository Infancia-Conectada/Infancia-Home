const express = require('express');
const router = express.Router();


router.get('/', function(rec, res){
    res.render("index")
});

router.get('/login-aluno', function(rec, res){
    res.render("login-aluno")
});

router.get('/aluno-online', function(rec, res){
    res.render("aluno-online")
});


module.exports = router;