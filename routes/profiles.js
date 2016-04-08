var express = require('express');
var router = express.Router();

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

var tempIOs = [
	{
		"id": 1,
		"name": "Garage"
	},
	{
		"id": 2,
		"name": "Beer fridge"
	},
	{
		"id": 3,
		"name": "Sprinklers"
	},
	{
		"id": 4,
		"name": "Dishwasher"
	},
	{
		"id": 5,
		"name": "Front door"
	},
	{
		"id": 6,
		"name": "Back door"
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
