module.exports = (router) => {
	const models = require('../models/index.js');
	const request = require('request-promise');


	router.get('/api/publicOccupation/all', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		try {
			let occupations = await models.PublicOccupation.All();
			if (!occupations) {
				occupations = [];
			}
			res.send(occupations);
		}
		catch (e) {
			console.error("Error: " + e);
			res.send({error: "Failed to get occupations"});
		}
	})


	router.get('/api/publicOccupation/:id', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		try {
			if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				res.send({});
			}
			else {
				let occupation = await models.PublicOccupation.Find({_id: req.params.id});
				res.send(occupation);
			}
		}
		catch (e) {
			console.log("Error: " + e);
			res.send({error: "Failed to get public occupation"});
		}
	})

	router.get('/api/publicOccupation/user/:id/compareSalaries', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		try {
			let teamMembers = await models.TeamMember.Find({userId: req.params.id});
			let info = [];

			for (let i = 0; i < teamMembers.length; i++) {
				let member = teamMembers[i];
				if (member.location) {
					let occupations = await models.PublicOccupation.Find({occcode: member.occupation, ratetype: member.wageType, area: member.location});
					occupations.sort((a, b) => {
						return new Date(a.periodyear).getTime() - new Date(b.periodyear).getTime()
					});

					let teamMemberInfo = {teamMember: member, occupations: occupations};
					info.push(teamMemberInfo);
				}
			}
			res.send(info);
		}
		catch (err) {
			console.error("Error: " + e)
			res.send({error: "Failed to get compare salaries"});
		}

	});


	router.get('/api/publicOccupation/user/:id/occupationalWages', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		try {
			let member = await models.TeamMember.FindOne({_id: req.params.memberid});

			let occupations = null;

			occupations = await models.PublicOccupation.Find({area: member.location, occcode: member.occupation, ratetype: (member.wageType || 1) });
			occupations.sort((a, b) => {
				return new Date(a.periodyear).getTime() - new Date(b.periodyear).getTime()
			});
			if (occupations) {
				let teamMemberInfo = {teamMember: member, occupation: occupations};
				res.send(teamMemberInfo);
			}
		}
		catch (err) {
			console.error("Error: " + e)
			res.send({error: "Failed to get latest salary"});
		}

	})
}
