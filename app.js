var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var getTest = require('./routes/getTest');
var postTest = require('./routes/postTest');
var uploadTest = require('./routes/uploadTest');
var upload64Test = require('./routes/upload64Test');
var login = require('./routes/auth/login');
var register = require('./routes/auth/register');
var profile = require('./routes/auth/profile');

var app = express();

//database
var config = require('./config');
var mongoose = require('mongoose');
mongoose.connect('mongodb://'+config.db.user+':'+config.db.pwd+'@'+config.db.host+':'+config.db.port+'/'+config.db.database);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connect db error:'));
db.once('open',function() {
    console.log(config.db.database + ' was connected...');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'2048kb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置跨域访问(仅开发环境)
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","POST,GET");
    res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/', index);
app.use('/getTest', getTest);
app.use('/postTest', postTest);
app.use('/uploadTest', uploadTest);
app.use('/upload64Test', upload64Test);
app.use('/login', login);
app.use('/register', register);
app.use('/getProfile', profile);

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
