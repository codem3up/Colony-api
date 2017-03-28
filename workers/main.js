const config = require('./config.js')
const request = require('request');

let occupationEndpoint = config.occupationEndpoint;

getOccupationEndpoints();

function getOccupationEndpoints() {
	let numRows = 5000;
	let offSet = 0;

	var timer = setInterval(function(){
		let queryParams = new config.query(occupationEndpoint);
		queryParams.add('periodyear', '2015');
		queryParams.add('$limit', numRows);
		queryParams.add('$offset', offSet)

		let endpoint = {
			url: occupationEndpoint + queryParams.query,
			headers: {
				'X-Auth-Token': config.authToken
			},
		};

		request(endpoint, function (error, response, body) {
			if(error) {
				console.log("ERROR: " + occupationEndpoint, error);
			}

			var objects = JSON.parse(body);

			if (objects.length === 0) {
				clearInterval(timer);
			}

			for (var i = 0; i < objects.length; i++) {
				//Save object
			}

			console.log(objects);
			console.log("Length: ", objects.length);
			console.log("occupationEndpoint", endpoint.url);

		});
		offSet = offSet + numRows;
	}, config.intervalTime);
}