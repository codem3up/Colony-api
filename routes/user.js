module.exports = function(router){
	var library = require('library');

	router.get('/user', function(req, res, next){
		library.User.All().then(function(users){
			res.setHeader('Content-Type', 'application/json');
	    res.send(users);
		})
	})

	router.post('/user/new', function(req, res, next) {
		var userParams = req.body.User;
		var user = new library.User(userParams.username, userParams.password);
		console.log(userParams);
		user.save().then(function(successful){
			res.setHeader('Content-Type', 'application/json');
			res.send({ result: true})
		}).catch(function(err){
			res.send({result: false})
		});
	});

	router.get('/user/:id', function(req, res, next){
		res.setHeader('Content-Type', 'application/json');
		//Check if valid object id before lookup
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
			res.send({});
		} else{
		library.User.Find({ _id: req.params.id }).then(function(user){
	    res.send(user);
		}).catch(function(err){
			res.send(err);
		})
		}
	})
}