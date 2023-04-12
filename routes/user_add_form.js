var express = require('express');
var db = require('../db.js');
const{UserModel} = require('../model.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('test');
  res.render('user_add_form');
});

//接收POST請求
router.post('/',async function(req, res, next) {
  
  var email = req.body.email;
  var password = req.body.password;
      
  // 建立一個新資料物件
  const newData = new UserModel({
    email: email,
    password: password    
  });
  await newData.save()
  .then(function(model) { //成功
    console.log(model);
    res.redirect("/user_login");//TODO: 確認之後新頁面
  })
  .catch(function(err){//失敗
    console.log(err);
  })
  res.render('test');

});
module.exports = router;