var express = require('express');
var router = express.Router();
var Helper = require('../lib/Helpers.js');
var session = require('express-session');
var passport = require('passport');

/* GET profiles list. */
router.get('/', function(req, res, next) {
	Helper.listProfiles(req, function(result){
		res.status(result.status).send(result.data);
	});
});

// router.get('/:profile_id/io', function(req, res, next) {
// 	res.send(tempIOs);
//   // res.render('index', { title: 'Express' });
// });

router.post('/', function(req, res, next) {
	Helper.addProfile(req, function(result){
		req.login(result.user, function(err){});
		res.status(result.status).send(result.data);
	});
});

router.put('/:profile_id', function(req, res, next) {
	Helper.updateProfile(req, function(result){
		// req.login(result.user, function(err){});
		res.status(result.status).send(result.data);
	});
});

router.delete('/:profile_id', function(req, res, next) {
	Helper.deleteProfile(req, function(result){
		req.login(req.user, function(err){});
		res.statusStatus(result.status);
	});
});

module.exports = router;
