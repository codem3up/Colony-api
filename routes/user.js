module.exports = (router) => {
	const models = require('../models/index.js');

	router.post('/api/user/new', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		let username = req.body.username.toLowerCase();
		let password = req.body.password;

		try {
			let saltAndHash = await models.User.GenerateSaltAndHash(password);
			let user = new models.User(username, saltAndHash.hash, saltAndHash.salt);
			let successful = await user.save();
			console.log("New User Added: ", successful._id);
			res.send({success: true});
		}
		catch (e) {
			console.error("Error: " + e)
			res.send({error: "Failed to add a new user"});
		}

	});


	router.post('/api/user/authenticate', async (req, res) => {
		res.setHeader('Content-Type', 'application/json');

		try {
			let user = await models.User.Find({username: req.body.username.toLowerCase()});

			if (!user) {
				res.send({success: false, message: 'Authentication failure: user not found.'});
			}
			else {

				let passwordValidated = await models.User.ValidatePassword(req.body.password, user.passwordHash)

				if (!passwordValidated) {
					res.json({success: false, message: 'Authentication failure: wrong password.'});
				}
				else {
					let token = await models.User.GetToken(user, req.app.get('jwtSecret'));

					res.json({
						success: true,
						token: token
					});
				}

			}
		}
		catch (e) {
			console.error("Error: " + e)
			res.send({error: "Failed to authenticate user"});
		}
	});

	router.get('/api/user/all', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		try {
			let users = await models.User.All();
			console.log("Users Found: ", users.length)
			res.send(users);
		}
		catch (e) {
			console.error("Error: " + e)
			res.send({error: "Failed to get users list"});
		}
	});


	router.get('/api/user/:id', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');

		//Check if valid object id before lookup
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			console.log("Invalid character entered");
			res.send({error: "Invalid character entered"});
		}
		else {
			try {
				let user = await models.User.Find({_id: req.params.id})
				console.log("User Found: ", req.params.id)
				res.send(user);
			}
			catch (e) {
				console.error("Error: " + e)
				res.send({error: "Failed to lookup user"});
			}
		}
	})


}