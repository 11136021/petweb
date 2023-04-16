// Define schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({//變數：資料型態
    a_string: String
});
var UserSchema = new Schema({//使用者資料（註冊）
    email: String,//帳號
    password: String,//密碼
    birthday: Date,   //生日
    name:String //使用者名稱
});
var CategorySchema = new Schema({//主題分類資料表
    Cate:Number, //類別編號(型態不確定)
    Catenam:String //類別名稱
    
});
var ArticleSchema = new Schema({//新增文章
    title: String,//標題
    category:String,//主題分類 ex:生食、熟食（下拉選單）
    content: String,//內文
    //photo: String
});
// Compile model from schema 物件名
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );
var UserModel = mongoose.model('UserModel', UserSchema);
var CategoryModel = mongoose.model('CategoryModel', CategorySchema);
var ArticleModel = mongoose.model('ArticleModel', ArticleSchema);

module.exports={SomeModel,UserModel,ArticleModel,CategoryModel} 