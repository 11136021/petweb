var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('medical_kan_med_organ');
});

module.exports = router;
