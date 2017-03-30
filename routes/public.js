module.exports = function (router) {
	const models = require('../models/index.js');
	const request = require('request');

	const projectionEndpoint = 'https://data.colorado.gov/resource/ba4c-qx73.json'
	const occupationWagesEndpoints = ''

	router.get('/projections', async (req, res, next) => {
		let response = await request(projectionEndpoint);
	})

	router.get('/user/:id/comparesalaries', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		try {
			let teamMembers = await models.TeamMember.Find({ userId: req.params.id });
			let info = [];

			for(let i = 0; i < teamMembers.length; i++) {
				let member = teamMembers[i];

				let occupations = await models.PublicOccupation.Find({ occcode: member.occupation, ratetype: 1});
				occupations.sort(function(a,b) { 
					return new Date(a.periodyear).getTime() - new Date(b.periodyear).getTime() 
				});

				let teamMemberInfo = { teamMember: member, occupations: occupations };
				info.push(teamMemberInfo);
			}
			res.send(info);
		} catch(err) {
			console.log(err);
		}
	})

	router.get('/user/:id/comparelatestsalaries', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
			
		try {
			let teamMembers = await models.TeamMember.Find({ userId: req.params.id });
			let info = [];

			for(let i = 0; i < teamMembers.length; i++) {
				let member = teamMembers[i];

				let occupations = await models.PublicOccupation.Find({ occcode: member.occupation, ratetype: 1});
				occupations.sort(function(a,b) { 
					return new Date(a.periodyear).getTime() - new Date(b.periodyear).getTime() 
				});

				if (occupations[0]) {
					let teamMemberInfo = { teamMember: member, occupation: occupations[0] };
					info.push(teamMemberInfo);
				}
			}
			res.send(info);
		} catch(err) {
			console.log(err);
		}
	})
}