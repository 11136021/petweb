var express = require('express');
var db = require('../db.js');
const{SomeModel} = require('../model.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test');
});

router.get('/1234',async function(req, res, next) {
  const small = new SomeModel({
    a_string:"1234"
  });
  await small.save()
  .then(function(model) {
    console.log(model);
  })
  .catch(function(err){
    console.log(err);
  })
  res.render('test');
});


module.exports = router;