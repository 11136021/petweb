var express = require('express');
var router = express.Router();
const { UserModel } = require('../model.js');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.email) {
    var email = req.session.email;
    
    UserModel.find({ email: email }).exec()
      .then(function (model) {
        console.log('profile, model length == ' + model.length);
        console.log('model: ' + model[0]);
        res.render('profile', { model: model });
      })
      .catch(function (err) {
        console.log(err);
        res.redirect("/user_addFail");
      })
  } else {
    res.redirect("/user_login");
  }
});

router.post('/', async function(req, res, next) {
  if (req.session.email) {
    var email = req.session.email;
    var nickname = req.body.nickname;
    var introduction = req.body.introduction;
    var petname = req.body.petname;
    var birthday = req.body.birthday;
        
    // 新增圖片
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    const sampleFile = req.files.photo;
    const uploadPath = path.join(__dirname, '/..', '/photo/') + sampleFile.name;
    console.log(`fileuploadpath: ${uploadPath}`);
    
    // 移動上傳的檔案到伺服器端
    sampleFile.mv(uploadPath, async function(err) {
      if (err) {
        return res.status(500).send(err);
      }

      try {
        const userModel = await UserModel.findOne({ email });

        if (userModel) {
          userModel.birthday = birthday;
          userModel.nickname = nickname;
          userModel.petname = petname;
          userModel.introduction = introduction;
          userModel.photo = sampleFile.name;
          
          await userModel.save();
          res.redirect('/profile');
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        console.log(err);
        res.redirect("/user_addFail");
      }
    });
  } else {
    res.redirect('/user_login');
  }
});

module.exports = router;
