module.exports = function (router) {
	const models = require('../models/index.js');


	router.get('/member/all', function (req, res, next) {
		models.TeamMember.All().then(function (members) {
			res.setHeader('Content-Type', 'application/json');
			if (!members) {
				members = [];
			}
			res.send(members);
		})
	})


	router.get('/member/:id', function (req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		//Check if valid object id before lookup
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			res.send({});
		} else {
			models.TeamMember.Find({_id: req.params.id}).then(function (member) {
				console.log("member", member);
				res.send(member);
			}).catch(function (err) {
				res.send(err);
			})
		}
	})


	router.get('/user/:id/member/all', function (req, res, next) {
		res.setHeader('Content-Type', 'application/json');

		if (models.isValidId(req.params.id)) {
			models.User.Find({_id: req.params.id}).then(function (user) {
				//User was found
				if (user && user["_id"]) {
					models.TeamMember.Find({userId: user._id}).then(function (members) {
						if (!members) {
							members = [];
						}
						res.send(members);
					})
				}
				//User not found
				else {
					res.sendStatus(404);
				}
			}).catch(function (err) {
				res.sendStatus(404);
			})
		} else {
			res.sendStatus(404)
		}
	})


	router.post('/user/:id/member/new', function (req, res, next) {
		res.setHeader('Content-Type', 'application/json');

		let teamParams = req.body;

		if (!teamParams) {
			res.sendStatus(404);
			return;
		}

		if (models.isValidId(req.params.id)) {
			models.User.Find({_id: req.params.id}).then(function (user) {
				//User was found
				if (user && user["username"]) {
					let date = Date.now();

					let teamMember = new models.TeamMember(user._id, teamParams.firstName, teamParams.lastName, teamParams.occupation,
						teamParams.wage, teamParams.wageType, teamParams.startDate,
						date, date, teamParams.profileImage);

					teamMember.save().then(function (success) {
						res.sendStatus(200);
					}).catch(function (err) {
						res.sendStatus(404);
					});
				}
				//User not found
				else {
					res.sendStatus(404);
				}
			}).catch(function (err) {
				res.sendStatus(404);
			})
		} else {
			res.sendStatus(404)
		}
	})


	router.get('/user/:id/member/:memberid', function (req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		//Check if valid object id before lookup
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			res.send({});
		} else {
			models.TeamMember.Find({_id: req.params.memberid, userId: req.params.id}).then(function (member) {
				console.log("member", member);
				res.send(member);
			}).catch(function (err) {
				res.send(err);
			})
		}
	})


	router.post('/user/:id/member/delete', function (req, res, next) {
		res.setHeader('Content-Type', 'application/json');

		models.TeamMember.Delete({id: req.params.id}).then(function () {
			res.sendStatus(200);
		}).catch(function () {
			console.log(result);
			res.sendStatus(404);
		})
	})


}