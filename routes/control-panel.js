var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET control-panel */
router.get('/', function(req, res, next) {
  res.render('control-panel', { title: 'particleFire Control Panel', user: req.user });
});


module.exports = router;
