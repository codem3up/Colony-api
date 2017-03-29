module.exports = function (router) {
	const models = require('../models/index.js');
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
		models.TeamMember.Find({ userId: req.params.id }).then(function(teamMembers){
			for(var i = 0; i < teamMembers.length; i++) {
				let member = teamMembers[i];

				models.PublicOccupation.Find({ occcode: member.occupation, ratetype: 1 }).then(function(occupations){
					if (occupations.length != 0) {
						var mean = 0;
						for(var z = 0; z < occupations.length; z++) {
							mean = mean + occupations[z].mean;
						}
						var finalMean = mean / occupations.length;
						console.log("Mean wage for " + occupations[0].codetitle + " = " + finalMean);
					} else {
						console.log("Occupation " + member.occupation + " not found");
					}
				})
			}
		})

		res.setHeader('Content-Type', 'application/json');
		res.send(body);
	})
}