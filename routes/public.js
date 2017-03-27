module.exports = function (router) {
	const request = require('request');

	const projectionEndpoint = 'https://data.colorado.gov/resource/ba4c-qx73.json'
	const occupationWagesEndpoints = ''

	router.get('/projections', function (req, res, next) {
		request(projectionEndpoint, function (error, response, body) {
			if (error) {
				res.status(500).send(error);
			}
			res.setHeader('Content-Type', 'application/json');
			res.send(body);
		});
	})

	router.get('/user/:id/comparesalaries', function (req, res, next) {
		request(occupationWagesEndpoint, function (error, response, body) {
			if (error) {
				res.status(500).send(error);
			}
			res.setHeader('Content-Type', 'application/json');
			res.send(body);
		});
	})
}