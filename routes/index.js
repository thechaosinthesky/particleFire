var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET style guide. */
router.get('/style_guide', function(req, res, next) {
  res.render('style_guide', { title: 'particleFire Console' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET login */
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign In' });
});

//sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/register', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//logs user out of site, deleting them from the session, and returns to homepage
router.get('/logout', function(req, res){
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out " + name + "!";
});


module.exports = router;
