//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection 帳號連結
var mongoDB = 'mongodb+srv://11136021:F2307226@cluster0.mdzrer1.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports=db
