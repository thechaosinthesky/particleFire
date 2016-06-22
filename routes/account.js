var express = require('express');
var router = express.Router();
var Helper = require('../lib/Helpers.js');
var passport = require('passport');

/* GET users account. */
router.get('/:user_id', function(req, res, next) {
	Helper.getUser(req, function(result){
		if(result.status == 403){
			res.redirect('/control-panel');
		}
		else{
			var data = result.data;
			data['title'] = 'particleFire - Account Settings';
			data['current_user'] = req.user;
			data['error'] = res.locals.error;
			data['success'] = res.locals.success;
			res.render('user_account', data);
		}
	});
});

router.post('/:user_id', function(req, res, next) {
	Helper.updateUser(req, function(result){
		if(result.status == 200){
			req.login(req.user, function(err){});
			req.session.success = "Successfully updated.";
		}
		else{
			req.session.error = result.error;
		}
		
		res.redirect('/account/' + req.params.user_id);
	});
});

router.post('/:user_id/devices', function(req, res, next) {
	Helper.addDevice(req, function(result){
		if(result.status == 200){
			req.session.success = "The device was successfully added.";
		}
		else{
			req.session.error = result.errors.join("  ");
		}
		
		res.redirect('/account/' + req.params.user_id);
	});
});

/* GET user devices account. */
router.get('/:user_id/devices', function(req, res, next) {
	Helper.listDevices(req, function(result){
		res.status(result.status).send(result.data.devices);
	});
});

module.exports = router;
