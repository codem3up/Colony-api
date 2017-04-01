module.exports = (router) => {
	const models = require('../models/index.js');
	const request = require('request-promise');

	const projectionEndpoint = 'https://data.colorado.gov/resource/ba4c-qx73.json';
	const occupationWagesEndpoints = '';

	router.get('/api/publicOccupation/projections', async (req, res, next) => {
		let response = await request(projectionEndpoint);

	});


	router.get('/api/publicOccupation/user/:id/comparesalaries', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		try {
			let teamMembers = await models.TeamMember.Find({userId: req.params.id});
			let info = [];

			for (let i = 0; i < teamMembers.length; i++) {
				let member = teamMembers[i];

				let occupations = await models.PublicOccupation.Find({occcode: member.occupation, ratetype: 1});
				occupations.sort((a, b) => {
					return new Date(a.periodyear).getTime() - new Date(b.periodyear).getTime()
				});

				let teamMemberInfo = {teamMember: member, occupations: occupations};
				info.push(teamMemberInfo);
			}
			res.send(info);
		}
		catch (err) {
			console.log(err);
		}

	});


	router.get('/api/publicOccupation/user/:id/occupationalwages', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		try {
			let teamMembers = await models.TeamMember.Find({userId: req.params.id});
			let info = [];

			for (let i = 0; i < teamMembers.length; i++) {
				let member = teamMembers[i];

				let occupations = await models.PublicOccupation.Find({occcode: member.occupation, ratetype: 1});
				occupations.sort((a, b) => {
					return new Date(a.periodyear).getTime() - new Date(b.periodyear).getTime()
				});

				if (occupations[0]) {
					let teamMemberInfo = {teamMember: member, occupation: occupations[0]};
					info.push(teamMemberInfo);
				}
			}
			res.send(info);
		}
		catch (err) {
			console.log(err);
		}

	})


};