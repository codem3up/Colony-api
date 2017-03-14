var express = require('express');
var router = express.Router();
var request = require('request');

var library = require('library');

var projectionEndpoint = 'https://data.colorado.gov/resource/ba4c-qx73.json'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/role', function(req, res, next){
	library.Role.Find().then(function(roles){
		res.setHeader('Content-Type', 'application/json');
    res.send(roles);
	})
})

router.post('/role/new', function(req, res, next) {
	var roleParams = req.body.Role;
	var role = new library.Role(roleParams.name, roleParams.salary);
	console.log(roleParams);
	role.save();
	res.render('index');
});


router.get('/projections', function(req, res, next){
	request(projectionEndpoint, function (error, response, body) {
		if(error) {
			res.status(500).send(error);
		} 
    	res.setHeader('Content-Type', 'application/json');
    	res.send(body);
	});
})

module.exports = router;
