var express = require('express');
const{ArticleModel} = require('../model.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.email){
    var email = req.session.email;
    res.render('new_article');
  }else{
    res.redirect('/user_login') //session
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
      content: content
    });

    newData.save()
    
    res.redirect("/"); //送出貼文之後，根據發布貼文所選擇的類別，跳轉到該類別的瀏覽畫面
    //用name去改？



  }else{
    res.redirect('/user_login') //session
  }

  
});


module.exports = router;
