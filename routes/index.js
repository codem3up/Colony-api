var express = require('express');
var router = express.Router();
var request = require('request');

var projectionEndpoint = 'https://data.colorado.gov/resource/ba4c-qx73.json?$limit=100&offset=100'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/projections', function(req, res, next){
	request.get(projectionEndpoint).on('response', function(response){
		console.log(response);
		res.render('index');
	})
})

module.exports = router;
