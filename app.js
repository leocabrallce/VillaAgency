const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');

// Web routes
const indexRouter = require('./routes/index');
const contactRouter = require('./routes/contact');
const propertiesRouter = require('./routes/properties');
const propertyDetailsRouter = require('./routes/property-details');

// API routes
const usersRouter = require('./routes/users');

const app = express();
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Web routes
app.use('/', indexRouter);
app.use('/index', indexRouter);
app.use('/contact', contactRouter);
app.use('/properties', propertiesRouter);
app.use('/property-details', propertyDetailsRouter);

// API routes
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
