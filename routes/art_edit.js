var express = require('express');
var router = express.Router();
const { ArticleModel } = require('../model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('art_edit');
});

module.exports = router;
