var express = require('express');
var router = express.Router();
var Helper = require('../lib/Helpers.js');
var passport = require('passport');

/* GET users account. */
router.get('/', function(req, res, next) {
	Helper.listDevices(req, function(result){
		var data = result.data;
		data['title'] = 'particleFire - Account Settings';
		data['user'] = req.user;
		res.render('user_account', data);
	});
});

router.post('/:user_id/devices', function(req, res, next) {
	Helper.addDevice(req, function(result){
		req.login(result.user, function(err){});
		// res.status(result.status).send(result.data);

		res.redirect('/account');
	});
});

/* GET user devices account. */
router.get('/devices', function(req, res, next) {
	Helper.listDevices(req, function(result){
		res.status(result.status).send(result.data.devices);
	});
});

module.exports = router;
