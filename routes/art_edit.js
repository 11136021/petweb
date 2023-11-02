var express = require('express');
var router = express.Router();
const { ArticleModel } = require('../model.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.email) {
    var email = req.session.email;

    ArticleModel.find( //從資料庫中抓取符合條件的資料
      { email: email }
    ).exec()
      .then(function (model) {
          console.log(model)
          console.log('art_edit, model length == ' + model.length);
          res.render('art_edit', { model: model });
        
      })
      .catch(function (err) { //觸發例外，先不管，直接跳登入失敗
        console.log(err);
        res.redirect("/user_addFail");
      })
  }else{
  res.redirect("/user_login");
}});

router.get('/edit/:id', function (req, res, next) {
  if (req.session.email) {
    var email = req.session.email;

    // 透過id來抓使用者選取的文章
    var id = req.params.id;
    console.log(id)

    ArticleModel.find( //從資料庫中抓取符合條件的資料
      { _id: id }
    ).exec()
      .then(function (model) {
          console.log(model)
          console.log('art_edit, model length == ' + model.length);
          res.render('cookpost', { model: model });
      })
      .catch(function (err) { //觸發例外，先不管，直接跳登入失敗
        console.log(err);
        res.redirect("/user_addFail");
      })
  }else{
  res.redirect("/user_login");
}});

router.get('/delete/:id', function (req, res, next) {
  if (req.session.email) {
    var email = req.session.email;

    // 透過id來抓使用者選取的文章
    var id = req.params.id;
    console.log(id)

    ArticleModel.deleteOne( //從資料庫中抓取符合條件的資料
      { _id: id }
    ).exec()
      .then(function (model) {
          console.log(model)
          console.log('art_edit, model length == ' + model.length);
          res.redirect("/art_edit");
      })
      .catch(function (err) { //觸發例外，先不管，直接跳登入失敗
        console.log(err);
        res.redirect("/user_addFail");
      })
  }else{
  res.redirect("/user_login");
}});


module.exports = router;
