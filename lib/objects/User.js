module.exports = function(mongoose){
	var async = require('asyncawait/async');
	var await = require('asyncawait/await');
	var Q = require('q');

	var Schema = mongoose.Schema;

	var userSchema = new Schema({
		username: { type: String, unique: true, required: true, dropDups: true },
		password: String
	});

	var userModel = mongoose.model('User', userSchema);

	function User(username, password) {
		this.username = username;
		this.password = password;
		this.save = save;
	}

	function save(){
		var deferred = Q.defer();
		var user = new userModel(this);
		user.save(function(err){
			if(err){
				console.log(err);
				deferred.reject(false);
			}
			deferred.resolve(true);
		})
		return deferred.promise;
	}

	User.All = async (function(obj){
		var users = await(userModel.find({}, function(err, users) {
			if(err) return null;
		}));

		return users;
	});

	User.Find = async (function(obj){
	var users = await(userModel.findOne(obj, 
		function(err, users) {
			if(err) 
				return null;
		}));

		return users;
	});

	return User;
}