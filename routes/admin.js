var express = require('express');
var router = express.Router();
var Helper = require('../lib/Helpers.js');
var passport = require('passport');

/* GET users. */
router.get('/users', function(req, res, next) {
	Helper.listUsers(req, function(result){
		res.render('users', { title: 'Users', current_user: req.user, users: result });
	});
});

/* GET users. */
router.get('/users/:user_id/devices', function(req, res, next) {
	Helper.getUser(req, function(result){
		var data = result.data;
		data['title'] = 'particleFire - Account Settings';
		data['current_user'] = req.user;
		data['error'] = res.locals.error;
		data['success'] = res.locals.success;
		res.render('user_devices', data);
	});
});

router.post('/users/:user_id/devices', function(req, res, next) {
	Helper.addDevice(req, function(result){
		if(result.status == 200){
			req.session.success = "The device was successfully added.";
		}
		else{
			req.session.error = result.errors.join("  ");
		}
		
		res.redirect('/admin/users/' + req.params.user_id + '/devices');
	});
});

module.exports = router;
