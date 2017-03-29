const config = require('./config.js')

const models = require('../models/index.js');
const request = require('request');
const mongoose = require('mongoose');

let occupationEndpoint = config.occupationEndpoint;

getOccupationEndpoints();

function getOccupationEndpoints() {
	let numRows = 500;
	let offSet = 0;

	let timer = setInterval(function(){
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
				setInterval(function(){
					mongoose.connection.close();
				}, config.intervalTime)
			}

			for (var i = 0; i < objects.length; i++) {
				//Save object
				var occ = objects[i];
				var occupation = new models.PublicOccupation(occ.stateabbrv, occ.areaname, occ.occcode, occ.codetitle, occ.ratetype,
							   occ.ratetydesc, occ.empcount, occ.mean, occ.median,
							   occ.pct10, occ.pct25, occ.pct75, occ.pct90);

				models.PublicOccupation.Find(occupation).then(function(result){
					if (result.length == 0){
						occupation.save();
					}
				})
			}

			//console.log(objects);
			console.log("Length: ", objects.length);
			console.log("occupationEndpoint", endpoint.url);

		});
		offSet = offSet + numRows;
	}, config.intervalTime);
}