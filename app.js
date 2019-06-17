var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');

mongoose.connect('mongodb://localhost:/e-commerce', { useNewUrlParser: true })
      .then(()=>{
        console.log('MongoDB Connected')
      })
      .catch(error => 
        console.log(`MongoDB connection error: ${error}`));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.use(expressValidator({
  errorFormatter: function(param, message, value){
    let namespace = param.split('.');
    let root = namespace.shift();
    let formParam = root;
    
    while(namespace.length){
      formParam += '[' + namespace.shift() + ']'
        }
    return {
      param: formParam,
      message: message,
      value: value
    }
  }
}))

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
