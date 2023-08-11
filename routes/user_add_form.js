var express = require('express');
var db = require('../db.js');
const{UserModel} = require('../model.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //加東西
  console.log('test');
  res.render('user_add_form');
});

//接收POST請求
router.post('/',async function(req, res, next) {
  
  var email = req.body.email;
  var password = req.body.password;
  var birthday = req.body.birthday;
  var name = req.body.name;

      
  // 建立一個新資料物件
  const newData = new UserModel({
    email: email,
    password: password,
    birthday: birthday,
    name: name
  });
  //到資料庫中尋找是否有相同的帳號

  //console.log("此帳號已註冊過");
  await UserModel.find({ email: email }).exec() //從資料庫中抓取資料
  //若沒有即可註冊（一個mail只能申請一個帳號)
  .then(function(model) { //成功
    console.log('model.length' + model.length)
    if(model.length===0){
      newData.save() //newdata 存進去
      console.log("1");
      res.redirect("/user_login");//TODO: 確認之後新頁面
    }else{
      console.log(model);
      res.redirect("/user_addFail");
    }
  })
  .catch(function(err){//失敗
    console.log(err);
    res.redirect("/user_addFail");
  })

});
module.exports = router;