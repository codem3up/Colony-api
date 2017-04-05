const config = require('./config.js')
const request = require('request-promise');

const models = require('../models/index.js');

module.exports = function(incomeEndpoint){
	let numRows = 5000;
	let offSet = 0;

	let timer = setInterval(function(){
		let queryParams = new config.query(incomeEndpoint);
		//queryParams.add('periodyear', '2015');
		queryParams.add('$limit', numRows);
		queryParams.add('$offset', offSet)

		let endpoint = {
			url: incomeEndpoint + queryParams.query,
			headers: {
				'X-Auth-Token': config.authToken
			},
		};

		request(endpoint, function (error, response, body) {
			if(error) {
				console.log("ERROR: " + incomeEndpoint, error);
			}

			let objects = JSON.parse(body);

			if (objects.length === 0) {
				console.log("Public Objects Query Complete");
				clearInterval(timer);
			}

			for (let i = 0; i < objects.length; i++) {
				//Save object
				let inc = objects[i];
				let income = new models.PersonalIncome(inc.stateabbrv, inc.areaname, inc.areatype, inc.area, inc.periodyear,
					                                    inc.periodtype, inc.pertypdesc, inc.inctype, inc.incdesc,
					                                    inc.income, inc.incrank, inc.population);

				income.save();
			}

			//console.log(objects);
			console.log("Saving " + objects.length + " records to db");
			console.log("Offset: ", offSet);
		});
		offSet = offSet + numRows;
	}, config.intervalTime);
}