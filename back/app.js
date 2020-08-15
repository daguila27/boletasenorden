var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();
var multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var companyRouter = require('./routes/empresa');
var categorieRouter = require('./routes/categoria');
var roleRouter = require('./routes/rol');
var expensiveRouter = require('./routes/gasto');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imagesFile')
  },
  filename: function (req, file, cb) {
    var str = file.originalname;
    str = str.replace(' ', '').replace(',', '').replace('/', '').replace('\\', '')
    cb(null, Date.now() + '-' + str )
  }
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/categories', categorieRouter);
app.use('/roles', roleRouter);
app.use('/expensives', expensiveRouter);


app.post('/uploadFile', function (req,res) {
  var upload = multer({ storage: storage }).single('file');
  upload(req,res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  });
});

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
