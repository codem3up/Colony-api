module.exports = function(router){
	
	var projectionEndpoint = 'https://data.colorado.gov/resource/ba4c-qx73.json'
	var occupationWagesEndpoint = ''
	var request = require('request');

	router.get('/projections', function(req, res, next){
		request(projectionEndpoint, function (error, response, body) {
			if(error) {
				res.status(500).send(error);
			} 
	    	res.setHeader('Content-Type', 'application/json');
	    	res.send(body);
		});
	})

	router.get('/user/:id/comparesalaries', function(req, res, next){
		request(occupationWagesEndpoint, function (error, response, body) {
			if(error) {
				res.status(500).send(error);
			} 
	    	res.setHeader('Content-Type', 'application/json');
	    	res.send(body);
		});
	})
}