const express = require('express');
const router = express.Router();


router.get('/', function(rec, res){
    res.render("index")
});


module.exports = router;