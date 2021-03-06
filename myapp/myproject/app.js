var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var personal = require('./routes/personal');
var shop = require('./routes/shop');
var activity = require('./routes/activity');
var home = require('./routes/home');
var setActivityInfo = require('./routes/setActivityInfo');
var setShopInfo = require('./routes/setShopInfo');
var setUserInfo = require('./routes/setUserInfo');
var uploadimg = require('./routes/uploadimg');
var openshop = require('./routes/openshop');
var postimg = require('./routes/postimg')
var post = require('./routes/post')
// var mondodb=require('./models/user');

var app = express();

app.get('/secret', function (req, res) {
  console.log('3 Accessing the secret section ...')
  res.send('Accessing the secret section')
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(function(req,res,next){
  res.set({
    "Access-Control-Allow-Origin":'*'
  })
  next();
})
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/personal', personal);
app.use('/shop', shop);
app.use('/home', home);
app.use('/activity', activity);
app.use('/setActivityInfo', setActivityInfo);
app.use('/setShopInfo', setShopInfo);
app.use('/setUserInfo', setUserInfo);
app.use('/uploadimg',uploadimg);openshop
app.use('/openshop',openshop);
app.use('/postimg',postimg);
app.use('/post',post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
 // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  let info = {
    getactivityInfo:'err',
    activityInfo:'something wrong'
  }
  console.log(err)
  // res.status(500);
  // res.render('error', { error: err });
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(info));
});


module.exports = app;
