const express = require('express');
const router = express.Router();


router.get('/', function(rec, res){
    res.render("index")
});

router.get('/login-aluno', function(rec, res){
    res.render("loginAluno")
});

router.get('/alunoOnline', function(rec, res){
    res.render("alunoOnline")
});


module.exports = router;