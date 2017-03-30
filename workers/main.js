const config = require('./config.js')

const models = require('../models/index.js');
const request = require('request');
const mongoose = require('mongoose');

let occupationEndpoint = config.occupationEndpoint;

getOccupationEndpoints();

function getOccupationEndpoints() {
	let numRows = 5000;
	let offSet = 0;

	let timer = setInterval(function(){
		let queryParams = new config.query(occupationEndpoint);
		//queryParams.add('periodyear', '2015');
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

			let objects = JSON.parse(body);

			if (objects.length === 0) {
				console.log("Public Objects Query Complete");
				clearInterval(timer);
			}

			for (let i = 0; i < objects.length; i++) {
				//Save object
				let occ = objects[i];
				let occupation = new models.PublicOccupation(occ.stateabbrv, occ.areaname, occ.occcode, occ.codetitle, occ.ratetype,
							   occ.ratetydesc, occ.empcount, occ.mean, occ.median,
							   occ.pct10, occ.pct25, occ.pct75, occ.pct90, occ.periodyear);

				occupation.save();
			}

			//console.log(objects);
			console.log("Saving " + objects.length + " records to db");
			console.log("Offset: ", offSet);
		});
		offSet = offSet + numRows;
	}, config.intervalTime);
}