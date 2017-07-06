var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var personal = require('./routes/personal');
var shop = require('./routes/shop');
var activity = require('./routes/activity');
var setActivityStatics = require('./routes/setActivityStatics');

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
app.use(bodyParser.urlencoded({extended:false}));
// app.use(multer()); // for parsing multipart/form-data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);
app.use('/login', login);
app.use('/personal', personal);
app.use('/shop', shop);
app.use('/activity', activity);
app.use('/setActivityStatics', setActivityStatics);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
