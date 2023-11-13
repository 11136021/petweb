var express = require('express');
var router = express.Router();
const{UserModel} = require('../model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user_login'); 
});

//接收POST請求
router.post('/',async function(req, res, next) {
  
  var email = req.body.email;
  var password = req.body.password;

  await UserModel.find( //從資料庫中抓取符合條件的資料
      {email: email, password: password }
  ).exec()
  .then(function(model) {
    if(model.length===0){ //沒有抓到資料，表示不符合條件，即登入失敗
      res.redirect("/user_loginFail");
    }else{ //有抓到資料，表示符合條件，即登入成功
      req.session.email = email //登入成功之後用email來存
      res.redirect("/main"); 
    }
  })
  .catch(function(err){ //觸發例外，先不管，直接跳登入失敗
    console.log(err);
    res.redirect("/user_loginFail");
  })
});
module.exports = router;

