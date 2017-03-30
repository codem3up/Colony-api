module.exports = function (router) {
	const models = require('../models/index.js');


	router.get('/member/all', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		try {
			let members = await models.TeamMember.All();
			if (!members) {
				members = [];
			}
			res.send(members);
		} catch (e) {
			console.error("Error: " + e);
			res.send({error: "Failed to get team member"});
		}
	})


	router.get('/member/:id', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		try {
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			res.send({});
		} else {
			let member = await models.TeamMember.Find({_id: req.params.id});
			res.send(member);
		}
		} catch (e) {
			console.log("Error: " + e);
			res.send({error: "Failed to get member"});
		}
	})


	router.get('/user/:id/member/all', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		try{
			if (models.isValidId(req.params.id)) {
				let user = await models.User.Find({_id: req.params.id});
					//User was found
					if (user && user["_id"]) {
						members = await models.TeamMember.Find({userId: user._id});
						if (!members) {
							members = [];
						}
						res.send(members);
					}
					//User not found
					else {
						res.send({error: "User not found"});
					}
			} else {
				res.send({error: "ID not valid"});
			}
		} catch (e) {
			console.log("Error: " + e);
			res.send({error: "Failed to get members"});
		}
	})


	router.post('/user/:id/member/new', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		let teamParams = req.body;
		try {
			if (!teamParams) {
				res.sendStatus(404);
				return;
			}

			if (models.isValidId(req.params.id)) {
				let user = await models.User.Find({_id: req.params.id});
				//User was found
				if (user && user["username"]) {
					let date = Date.now();

					let teamMember = new models.TeamMember(user._id, teamParams.firstName, teamParams.lastName, teamParams.occupation,
						teamParams.wage, teamParams.wageType, teamParams.startDate,
						date, date, teamParams.profileImage);

					let success = await teamMember.save();
					console.log("New Teammember Added: ", teamMember);
					res.send({success: true});
				}
				//User not found
				else {
					res.send({error: "User not found"});
				}
			} else {
				res.send({error: "ID not valid"});
			}
		} catch (e) {
			console.log("Error: " + e);
			res.send({error: "Failed to save member"});
		}
	})


	router.get('/user/:id/member/:memberid', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		//Check if valid object id before lookup
		try{
			if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				res.send({});
			} else {
				let member = await models.TeamMember.Find({_id: req.params.memberid, userId: req.params.id});
				res.send(member);
			}
		} catch (e) {
			console.log("Error: " + e);
			res.send({error: "Member not found"});
		}
	})


	router.post('/user/:id/member/:memberid/delete', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		try {
			console.log(req.params.memberid);
			success = models.TeamMember.Delete({id: req.params.memberid});
			res.send({success: true});
		} catch (e) {
			console.log("Error: " + e);
			res.send({error: "Delete unsuccessful"});
		}
	})


}