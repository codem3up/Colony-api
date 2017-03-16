module.exports = function(router){
	var library = require('library');

	router.get('/user/:id/member/new', function(req, res, next){
		res.setHeader('Content-Type', 'application/json');
		library.User.Find({ _id: req.params.id }).then(function(user){
	    	if(user){
	    		console.log("USERRR!!!");
	    		res.send(user);
	    	} else{
	    		res.send(user);
	    	}
		}).catch(function(err){
			console.log("ERRRORRRR", err);
			res.send(err);
		})
	})
}