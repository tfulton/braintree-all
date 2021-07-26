var express = require('express');
var cors = require('cors')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(cors())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*******************************************/
/*************** BEGIN: ROUTES**************/
/*******************************************/

var index = require('./routes/index');
app.use('/', index);;

// auth route
var token = require('./routes/token');
app.use('/token', token);

// merchant account
var merchant = require('./routes/merchant');
app.use('/merchant', merchant);

// capture route
var capture = require('./routes/capture');
app.use('/capture', capture);

// authorize route
var authorize = require('./routes/authorize');
app.use('/authorize', authorize);

// customer route
var customer = require('./routes/customer');
app.use('/customer', customer);

// transaction find
var find = require('./routes/find');
app.use('/find', find);

// payment method route
var method = require('./routes/method');
app.use('/method', method);

// void
var voidTx = require('./routes/void');
app.use('/void', voidTx);

// refund
var refund = require('./routes/refund');
app.use('/refund', refund);

// host info
var hostinfo = require('./routes/hostinfo');
app.use('/host', hostinfo);

var webhooks = require('./routes/webhooks');
app.use('/webhooks', webhooks);

var graphql = require('./routes/graphql');
app.use('/graphql', graphql);

let disputes = require('./routes/dispute');
app.use('/dispute', disputes);

var testData = require('./routes/testData');
app.use('/testdata', testData);

/*******************************************/
/*************** END: ROUTES ***************/
/*******************************************/


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
