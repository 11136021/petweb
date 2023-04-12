// Define schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    a_string: String//變數：資料型態
});
var UserSchema = new Schema({//變數：資料型態
    email: String,
    password: String    
});
// Compile model from schema 物件名
var SomeModel = mongoose.model('SomeModel', SomeModelSchema );
var UserModel = mongoose.model('UserModel', UserSchema);

module.exports={SomeModel,UserModel} 