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
]

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send(tempProfiles);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
