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
        
          console.log('profile, model length == ' + model.length);
          res.render('profile', { model: model });
        
      })
      .catch(function (err) { //觸發例外，先不管，直接跳登入失敗
        console.log(err);
        res.redirect("/user_addFail");
      })
  }else{
  res.redirect("/user_login");
}});

router.post('/',async function(req, res, next) {

  if(req.session.email){
    var email = req.session.email;
    var photo = req.body.photo;
    var nickname = req.body.nickname;
    var introduction = req.body.introduction;
    var petname = req.body.pets;
    var birthday = req.body.birthday;
        
  //新增圖片
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.photo;
    uploadPath = path.join(__dirname, '/..', '/photo/') + sampleFile.name;
    console.log(`fileuploadpath: ${uploadPath}`);
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);

      console.log("file uploaded");
      //res.send('File uploaded!');
    });
    
    
    // 建立一個新資料物件
    const newData = new ArticleModel({
      email: email,
      title: title,
      category: category,
      subcate:'profile',
      content: content,
      photo:sampleFile.name
    });

    newData.save()
    res.redirect('/profile') 
  }else{
      res.redirect('/profile') //session
  }

  
});
module.exports = router;
