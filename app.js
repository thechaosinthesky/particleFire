var express = require('express');
// var sass = require('node-sass');
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var TwitterStrategy = require('passport-twitter');
var GoogleStrategy = require('passport-google');
var FacebookStrategy = require('passport-facebook');

var routes = require('./routes/index');
var account = require('./routes/account');
var controlPanel = require('./routes/control-panel');
var profiles = require('./routes/profiles');

var app = express();

var config = require('./config/config.js');
var Helper = require('./lib/Helpers.js');

//===============PASSPORT===============
// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.email);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

// Use the LocalStrategy within Passport to login/”signin” users.
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, email, password, done) {
    Helper.localAuth(email, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.email);
        req.session.success = 'You are successfully logged in ' + user.email + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));
// Use the LocalStrategy within Passport to register/"signup" users.
passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, email, password, done) {
    console.log("GOOO");
    console.log(email);
    Helper.localReg(email, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.email);
        req.session.success = 'You are successfully registered and logged in ' + user.email + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That email is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

//===============EXPRESS===============

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'beanpole', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

// notice that the following line has been removed
// app.use(express.static(__dirname + '/public'));

app.use(
  sassMiddleware({
    src: __dirname + '/sass',
    dest: __dirname + '/public',
    debug: true,
  })
);

// The static middleware must come after the sass middleware
app.use(express.static( path.join( __dirname, 'public' ) ) );

app.use('/', routes);
app.use('/account', account);
app.use('/control-panel', controlPanel);
app.use('/profiles', profiles);

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
