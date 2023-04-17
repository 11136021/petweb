var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user_login'); 
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

  await newData.find()
  
  .then(function(model) { //成功
    console.log(model);
    res.redirect("main");//TODO: 確認之後新頁面(主頁)完成submit後回傳畫面
  })
  .catch(function(err){//失敗
    console.log(err);
    res.redirect("user_loginFail");//TODO: 登入失敗之後新頁面（登入失敗頁面）
  })
  res.render('test');

});
module.exports = router;

