var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var logger = require('morgan');
var fs = require("fs");

// Routes
var routes = require('./routes/index');

// App
var app = express();

// view engine setup
app.set('views', __dirname + '/src/views/pages/');
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'default',layoutsDir: "src/views/layouts/",partialsDir: "src/views/partials/"}));
app.set('view engine', '.hbs');



app.use(logger('dev'));
// path to static assets, normally /public
app.use(express.static(path.join(__dirname, '')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
