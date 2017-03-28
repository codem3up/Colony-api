const config = require('./config.js')

const library = require('library');
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
				var occ = objects[i];
				let publicOccupation = new library.PublicOccupation(occ.stateabbrv, occ.areaname, occ.occcode, occ.codetitle, occ.ratetype,
							   occ.ratetydesc, occ.empcount, occ.mean, occ.median,
							   occ.pct10, occ.pct25, occ.pct75, occ.pct90);
				console.log("Occupation", publicOccupation);
			}

			console.log(objects);
			console.log("Length: ", objects.length);
			console.log("occupationEndpoint", endpoint.url);

		});
		offSet = offSet + numRows;
	}, config.intervalTime);
}