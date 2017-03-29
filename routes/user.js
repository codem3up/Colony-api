module.exports = function (router) {
	const models = require('../models/index.js');


	router.get('/user/all', function (req, res, next) {
		models.User.All().then(function (users) {
			res.setHeader('Content-Type', 'application/json');
			res.send(users);
		})
	})


	router.post('/user/new', function (req, res, next) {
		let userParams = req.body;
		let user = new models.User(userParams.username, userParams.password);
		user.save().then(function (successful) {
			console.log("New User Added")
			res.setHeader('Content-Type', 'application/json');
			res.send({result: true})
		}).catch(function (err) {
			res.send({result: false})
		});
	});


	router.get('/user/:id', function (req, res, next) {
		res.setHeader('Content-Type', 'application/json');
		//Check if valid object id before lookup
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			res.send({});
		} else {
			models.User.Find({_id: req.params.id}).then(function (user) {
				res.send(user);
			}).catch(function (err) {
				res.send(err);
			})
		}
	})


}