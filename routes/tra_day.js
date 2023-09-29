var express = require('express');
var router = express.Router();
const { ArticleModel } = require('../model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.email) {
    var email = req.session.email;

    ArticleModel.find( //從資料庫中抓取符合條件的資料
      { category: 'recipe' }
    ).exec()
      .then(function (model) {
        if (model.length === 0) {
          console.log('tra_day, model length == 0');
          res.redirect("/user_addFail");
        } else { //有抓到資料，表示符合條件，即登入成功
          req.session.email = email //登入成功之後用email來存
          console.log('tra_day, model length == ' + model.length);
          res.render('tra_day', { model: model });
        }
      })
      .catch(function (err) { //觸發例外，先不管，直接跳登入失敗
        console.log(err);
        res.redirect("/user_addFail");
      })
  }else{
  res.redirect("/user_login");
}
}
);

module.exports = router;
