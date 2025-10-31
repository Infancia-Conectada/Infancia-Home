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

router.get('/cadastro-aluno', function(rec, res){
    res.render("cadastro-aluno")
});

router.get('/login-instituicao', function(rec, res){
    res.render("login-instituicao")
});

router.get('/galeria', function(rec, res){
    res.render("galeria")
});

router.get('/politica-privacidade', function(rec, res){
    res.render("privacidade")
});

//Administrativo//
router.get('/login-adm', function(rec, res){
    res.render("adm/login-adm")
});

router.get('/dashboard-adm', function(rec, res){
    res.render("adm/dashboard-adm")
});


//Header e Footer//
router.get('/header', function(rec, res){
    res.render("h&f/header-infancia")
});

router.get('/footer', function(rec, res){
    res.render("h&f/footer-infancia")
});

module.exports = router;