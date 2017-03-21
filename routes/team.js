module.exports = function(router){
	var library = require('library');


	router.get('/member/all', function(req, res, next){
		library.TeamMember.All().then(function(members){
			res.setHeader('Content-Type', 'application/json');
	    	if(!members){
	    		members = [];
	    	}
	    	res.send(members);
		})
	})


	router.get('/user/:id/member/all', function(req, res, next){
		res.setHeader('Content-Type', 'application/json');

		if(library.isValidId(req.params.id)) {
			library.User.Find({ _id: req.params.id }).then(function(user){
				//User was found
		    	if(user && user["_id"]){
		    		library.TeamMember.Find({ userId: user._id }).then(function(members){
				    	if(!members){
				    		members = [];
				    	}
				    	res.send(members);
						})
		    	}
		    	//User not found
		    	else{
		    		res.sendStatus(404);
		    	}
			}).catch(function(err) {
				res.sendStatus(404);
			})
		} else {
			res.sendStatus(404)
		}
	})

	router.post('/user/:id/member/new', function(req, res, next){
		res.setHeader('Content-Type', 'application/json');

		var teamParams = req.body.teamMember;

		if (!teamParams){
			res.sendStatus(404);
			return;
		}

		if(library.isValidId(req.params.id)) {
			library.User.Find({ _id: req.params.id }).then(function(user){
				//User was found
		    	if(user && user["username"]){
		    		var date = Date.now();

		    		var teamMember = new library.TeamMember(user._id, teamParams.firstName, teamParams.lastName, teamParams.occupation, 
		    												teamParams.wage, teamParams.wageType, teamParams.startDate, 
		    												date, date, teamParams.profileImage);

		    			teamMember.save().then(function(success){
								res.sendStatus(200);
							}).catch(function(err){
								res.sendStatus(404);
							});
		    	}
		    	//User not found
		    	else{
		    		res.sendStatus(404);
		    	}
			}).catch(function(err) {
				res.sendStatus(404);
			})
		} else {
			res.sendStatus(404)
		}
	})


}