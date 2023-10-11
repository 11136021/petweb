var express = require('express');
var router = express.Router();
const { ArticleModel } = require('../model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.email) {
    var email = req.session.email;

    ArticleModel.find( //從資料庫中抓取符合條件的資料
      { category: 'medical' }
    ).exec()
      .then(function (model) {
        if (model.length === 0) {
          console.log('medical_kan_mouth, model length == 0');
          res.redirect("/user_addFail");
        } else { //有抓到資料，表示符合條件，即登入成功
          req.session.email = email //登入成功之後用email來存
          console.log('medical_kan_mouth, model length == ' + model.length);
          res.render('medical_kan_mouth', { model: model });
        }
      })
      .catch(function (err) { //觸發例外，先不管，直接跳登入失敗
        console.log(err);
        res.redirect("/user_addFail");
      })
  }else{
  res.redirect("/user_login");
}
});
router.post('/',async function(req, res, next) {

  if(req.session.email){
    var email = req.session.email;
    var title = req.body.title;
    var category = req.body.category;
    var content = req.body.content;
        
    // 建立一個新資料物件
    const newData = new ArticleModel({
      email: email,
      title: title,
      category: category,
      subcate:'mouth',
      content: content
    });

    newData.save()
    res.redirect('/medical_kan_mouth') 
    }else{
      res.redirect('/user_login') //session
    }


    //送出貼文之後，根據發布貼文所選擇的類別，跳轉到該類別的瀏覽畫面
    //用name去改
  
});

module.exports = router;
