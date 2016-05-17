var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET control-panel */
router.get('/', function(req, res, next) {
  console.log(req.user);
  console.log(req.session.success);

  res.render('control-panel', { title: 'particleFire Control Panel', user: req.user });
});


module.exports = router;
