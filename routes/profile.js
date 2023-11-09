var express = require('express');
var router = express.Router();
const { UserModel } = require('../model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.email) {
    var email = req.session.email;

    UserModel.find( //從資料庫中抓取符合條件的資料
      { email: email }
    ).exec()
      .then(function (model) {
        
          console.log('cook_kan_cooked, model length == ' + model.length);
          res.render('profile', { model: model });
        
      })
      .catch(function (err) { //觸發例外，先不管，直接跳登入失敗
        console.log(err);
        res.redirect("/user_addFail");
      })
  }else{
  res.redirect("/user_login");
}});

module.exports = router;
