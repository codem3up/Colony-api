var express = require('express');
var router = express.Router();
var request = require('request');

var projectionEndpoint = 'https://data.colorado.gov/resource/ba4c-qx73.json'

/* GET home page. */
router.get('/', function(req, res, next) {
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
