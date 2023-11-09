var express = require('express');
var router = express.Router();
const { ArticleModel } = require('../model.js');
const path = require('path');

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
          console.log('art_edit, model length == ' + model.length);
          var can_edit = false;
          console.log('art_edit, req.session.email = ' + req.session.email);
          console.log('art_edit, model.email = ' + model[0].email);
          if(req.session.email==model[0].email){
            can_edit=true;
          }
          console.log('art_edit, can_edit = ' + can_edit);
          res.render('cookpost', { model: model,can_edit: can_edit});
        
      })
      .catch(function (err) { //觸發例外，先不管，直接跳登入失敗
        console.log(err);
        res.redirect("/user_addFail");
      })
  }else{
  res.redirect("/user_login");
}});

router.post('/edit/:id', function (req, res, next) {
  if (req.session.email) {
    
    var id = req.params.id;
    var title = req.body.edit_title;
    var content = req.body.edit_content;
    var sampleFile = '';
    
    try{
      if (req.files || Object.keys(req.files).length !== 0) {
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.photo;
        uploadPath = path.join(__dirname, '/..', '/photo/') + sampleFile.name;
        console.log(`fileuploadpath: ${uploadPath}`);
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, function(err) {
          if (err)
            return res.status(500).send(err);
          else
            console.log("file uploaded");
        });
      }
    }catch{}

    var queryValue = {_id:id};
    if (sampleFile == '')
      var editValues = {title: title, content: content };
    else
      var editValues = {title: title, content: content,photo: sampleFile.name };
    
    // {查詢,修改成}
    ArticleModel.updateOne( //從資料庫中抓取符合條件的資料
      queryValue, editValues
    ).exec()
      .then(function (model) {
          res.redirect("/art_edit/edit/" + id);
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
