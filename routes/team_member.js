module.exports = (router) => {
	const models = require('../models/index.js');


	router.post('/api/user/:id/teamMember/new', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		let teamParams = req.body;

		if (!teamParams) {
			res.sendStatus(404);
			return;
		}

		if (models.isValidId(req.params.id)) {
			try {
				let user = await models.User.Find({_id: req.params.id});
				if (user && user["username"]) {
					let date = Date.now();

					let teamMember = new models.TeamMember(user._id, teamParams.firstName, teamParams.lastName, teamParams.occupation,
						teamParams.wage, teamParams.wageType, teamParams.startDate,
						date, date, teamParams.profileImage);

					let success = await teamMember.save();
					console.log("New team member Added: ", success._id);
					res.send({success: true});
				}
				else {
					res.send({error: "User not found"});
				}
			}
			catch (e) {
				console.log("Error: " + e);
				res.send({error: "Failed to save team member"});
			}
		}
		else {
			res.send({error: "ID not valid"});
		}
	});


	router.get('/api/user/:id/teamMember/all', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		if (models.isValidId(req.params.id)) {
			try {
				let user = await models.User.Find({_id: req.params.id});
				if (user && user["_id"]) {
					let members = await models.TeamMember.All({userId: user._id});
					if (!members) {
						members = [];
					}
					res.send(members);
				}
				else {
					res.send({error: "User not found"});
				}
			}
			catch (e) {
				console.log("Error: " + e);
				res.send({error: "Failed to get members"});
			}
		}
		else {
			res.send({error: "ID not valid"});
		}
	});

	router.get('/api/user/:id/teamMember/occupation/all', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		if (models.isValidId(req.params.id)) {
			try {
				let user = await models.User.Find({_id: req.params.id});
				if (user && user["_id"]) {
					let members = await models.TeamMember.All();
					if (!members){
						res.send({error: "Failed to Find member"});
					}
					for(let i = 0; i < members.length; i++) {
						occupations = await models.PublicOccupation.Find({area: member.location, occcode: member.occupation, ratetype: (member.wageType || 1) });
						occupations.sort((a, b) => {
							return new Date(a.periodyear).getTime() - new Date(b.periodyear).getTime()
						});
						member.occupationName = occupations[0].codetitle;
					}
					res.send(members);
				}
				else {
					res.send({error: "User not found"});
				}
			}
			catch (e) {
				console.log("Error: " + e);
				res.send({error: "Failed to get members"});
			}
		}
		else {
			res.send({error: "ID not valid"});
		}
	});


	router.get('/api/user/:id/teamMember/:teamMemberId', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		//Check if valid object id before lookup
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			res.send({});
		}
		else {
			try {
				let member = await models.TeamMember.Find({_id: req.params.teamMemberId, userId: req.params.id});
				res.send(member);
			}
			catch (e) {
				console.log("Error: " + e);
				res.send({error: "Team member not found"});
			}
		}
	});

	router.get('/api/user/:id/teamMember/:teamMemberId/summary', async (req, res, next) => {
		try{
			let member = await models.TeamMember.FindOne({_id: req.params.teamMemberId, });
			let occupation = await models.PublicOccupation.FindOne({ occcode: member.occupation})
			member.occupationTitle = occupation.codetitle
			res.render('summary', { member: member });
		} catch(err) {
			console.error("Error: " + err)
			res.send({error: "Failed to get member"});
		}
	});

	router.post('/api/user/:id/teamMember/:teamMemberId/delete', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		try {
			let success = await models.TeamMember.Delete({userId: req.params.id, id: req.params.teamMemberId});
			console.log("Team member deleted: ", success._id);
			res.send({success: true});
		}
		catch (e) {
			console.log("Error: " + e);
			res.send({error: "Failed to delete team member"});
		}
	})
};