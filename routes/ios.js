var express = require('express');
var router = express.Router();
var passport = require('passport');
var Helper = require('../lib/Helpers.js');
var ParticleAPI = require('../lib/APIHelper.js').ParticleAPI;

/* GET io list. */
router.get('/', function(req, res, next) {
	Helper.listIOs(req, function(result){
		res.status(result.status).send(result.data);
	});
});

router.post('/', function(req, res, next) {
	Helper.addIO(req, function(result){
		req.login(result.user, function(err){});
		res.status(result.status).send(result.data);
	});
});

router.put('/:io_id', function(req, res, next) {
	Helper.updateIO(req, function(result){
		// req.login(result.user, function(err){});
		res.status(result.status).send(result.data);
	});
});

router.post('/:io_id', function(req, res, next) {

	console.log("TRIGGER THE IO");
	Helper.getIODevice(req, function(result){
		var device = result.data;
		ParticleAPI.triggerDevice(device.external_id, function(data){
			console.log("Triggered DEVICES");
			console.log(data);
			res.status(result.status).send({});
		});
	});

	// ParticleAPI.getDevices(function(data){
	// 	console.log("GOT DEVICES");
	// 	console.log(data);
	// 	res.status(200).send({});
	// });
});

module.exports = router;
