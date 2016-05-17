var express = require('express');
var router = express.Router();
var Helper = require('../lib/Helpers.js');
var passport = require('passport');

var tempProfiles1 = [];

var tempProfiles = [
	{
		"id": 1,
		"name": "House"
	},
	{
		"id": 2,
		"name": "Brewing"
	}
];

var tempIOs1 = [];

var tempIOs = [
	{
		"id": 1,
		"name": "Garage",
		"type": "trigger",
		"device_name": "Aragon"
	},
	{
		"id": 2,
		"name": "Beer fridge",
		"type": "trigger",
		"device_name": "Boromir"
	},
	{
		"id": 3,
		"name": "Sprinklers",
		"type": "trigger"
	},
	{
		"id": 4,
		"name": "Dishwasher",
		"type": "trigger"
	},
	{
		"id": 5,
		"name": "Front door",
		"type": "trigger"
	},
	{
		"id": 6,
		"name": "Back door",
		"type": "trigger"
	}
];

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send(tempProfiles);
  // res.render('index', { title: 'Express' });
});

router.get('/:profile_id/io', function(req, res, next) {
	res.send(tempIOs);
  // res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
	Helper.addProfile(req, function(result){
		req.login(result.user, function(err){});
		res.status(result.status).send(result.obj);
	});
});

module.exports = router;
