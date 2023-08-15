var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.email){
    var email = req.session.email;
    res.render('medical_kan_mouth');
  }else{
    res.redirect('/user_login')
  }
});
module.exports = router;
