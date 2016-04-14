var express = require('express');
var router = express.Router();

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
		"type": "trigger"
	},
	{
		"id": 2,
		"name": "Beer fridge",
		"type": "trigger"
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

module.exports = router;
