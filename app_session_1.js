var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parsaer');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var index =require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Dishes = require('./models/dishes');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
  useMongoClient: true
});

connect.then((db) => {
  console.log('connected correctly to the server');
},(err) => {console.log(err); });

var app = express();
//view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');

//uncomment after placing your favicon in /public
//app.use(favicon(patj:join(__dirname,'public','favicon.icon
app.use(logger('deev'));
app.use(bodyParser.json());
app.use(bodyParser,urlencoded({ extended: false})):
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name: 'session-id',
  secret:'12345-67890-09876-54321',
  saveUninitialized:false,
resave:false,
store: new FileStore()
}));
function auth(req,res,next) {
  console.log(req.session);
if(!req.session.user) {
  var authHeader = req.headers.authorization;
if(!authHeader) {
var err = new Error('You are not authenticated!');
res.setHeader('www-Authenticate','Basic');
err.status = 401;
return next(err);
}

var auth = new Buffer(authHeader.split(' ')[1], 'base64);
var username = auth[0];
var password = auth[1];
if(username === 'admin' && password === 'password') {
 req.sessin.user = 'admin';
 next();
}
else {
var err = new Error('You are not authenticatyed');
res.setHeader('www-Authenticate','Basic');
err.status = 401;
return next(err);
}
}
else {
if(req.session.user === 'admin') {
  next();
}
else {
  var err = new Error('You are not authenticate');
 err.status = 401;
 return next(Err);
}
}
}
app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));



app.use('/dishes',dishRouter);

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
