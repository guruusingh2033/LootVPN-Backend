var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth.js');
var cors = require('cors')

var config = require('./config/config.js');


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(config.routing.common_route, authRouter);

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











// var mysql = require('mysql');
// var express = require('express');
// var body_parser = require('body-parser');
// var aws = require('aws-sdk');
// var path = require("path");
// var app = express();
// var common_routing = require('./routing/common.js')

// var config = require('./config/config.js');


// app.use(body_parser.json());
// app.use(body_parser.urlencoded({ extended: true }));
// app.use(config.routing.common_route, common_routing);


// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.header("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,userid,teamid,token,messageType,recepientId,senderId");

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', false);

//   // Pass to next layer of middleware
//   next();
// })






// app.get(/.*?\.\w{2,4}$/, function (req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'));
// })

// // user.storeSeedData();
// app.listen(config.server_port, function () {
//   console.log("listening to port " + config.server_port)
// })