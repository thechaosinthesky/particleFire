var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET style guide. */
router.get('/style_guide', function(req, res, next) {
  res.render('style_guide', { title: 'particleFire Console' });
});

module.exports = router;
