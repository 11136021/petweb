var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//這裡加入route
var indexRouter = require('./routes/index'); 
var usersRouter = require('./routes/users');
var main = require('./routes/main');
var user_login = require('./routes/user_login');
var user_logout = require('./routes/user_logout');
var user_loginFail = require('./routes/user_loginFail');
var user_addFail = require('./routes/user_addFail');
var user_add_form = require('./routes/user_add_form');
var cook_kan = require('./routes/cook_kan');
var medical_kan = require('./routes/medical_kan');
var lost_kan = require('./routes/lost_kan');
var shopping_kan = require('./routes/shopping_kan');
var cook_kan_rare = require('./routes/cook_kan_rare');
var cook_kan_cooked = require('./routes/cook_kan_cooked');
var medical_kan_med_skin = require('./routes/medical_kan_med_skin');
var medical_kan_med_organ = require('./routes/medical_kan_med_organ');
var medical_kan_mouth = require('./routes/medical_kan_mouth');
var medical_kan_med_limb = require('./routes/medical_kan_med_limb');
var lost_lookfor = require('./routes/lost_lookfor');
var lost_picked = require('./routes/lost_picked');
var tra_day = require('./routes/tra_day');
var tra_hotal = require('./routes/tra_hotal');
var tra_restaurant = require('./routes/tra_restaurant');
var profile = require('./routes/profile');
var pro_edit = require('./routes/pro_edit');
var pro_newpw = require('./routes/pro_newpw');
var art_edit = require('./routes/art_edit');
var new_article = require('./routes/new_article');
var about_us = require('./routes/about_us');
var cookpost = require('./routes/cookpost'); //文章內頁
var author = require('./routes/author');
var test = require('./routes/test');//湘雲測試的畫面 勿動
var test2 = require('./routes/test2');//湘雲測試的畫面 勿動
var forge_html = require('./routes/forge_html');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 這裡加入use
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/main', main);
app.use('/user_login', user_login);
app.use('/user_logout', user_logout);
app.use('/user_loginFail', user_loginFail);
app.use('/user_addFail', user_addFail);
app.use('/user_add_form', user_add_form);
app.use('/cook_kan', cook_kan);
app.use('/medical_kan', medical_kan);
app.use('/lost_kan', lost_kan);
app.use('/shopping_kan', shopping_kan);
app.use('/cook_kan_rare', cook_kan_rare);
app.use('/cook_kan_cooked', cook_kan_cooked);
app.use('/medical_kan_med_skin', medical_kan_med_skin);
app.use('/medical_kan_med_organ', medical_kan_med_organ);
app.use('/medical_kan_mouth', medical_kan_mouth);
app.use('/medical_kan_med_limb', medical_kan_med_limb);
app.use('/lost_lookfor', lost_lookfor);
app.use('/lost_picked', lost_picked);
app.use('/tra_day', tra_day);
app.use('/tra_hotal', tra_hotal);
app.use('/tra_restaurant', tra_restaurant);
app.use('/profile', profile);
app.use('/pro_edit', pro_edit);
app.use('/pro_newpw', pro_newpw);
app.use('/art_edit', art_edit);
app.use('/new_article', new_article);
app.use('/about_us', about_us);
app.use('/cookpost', cookpost);
app.use('/author', author);
app.use('/test', test);
app.use('/test2', test2);
app.use('/forge_html', forge_html);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
