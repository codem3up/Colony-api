module.exports = function (mongoose) {
	const Q = require('q');
	const Schema = mongoose.Schema;

	const userSchema = new Schema({
		username: {type: String, unique: true, required: true, dropDups: true},
		password: String
	});

	const userModel = mongoose.model('User', userSchema);

	let User = function (username, password) {
		this.username = username;
		this.password = password;
		this.save = save;
	}

	let save = function () {
		let deferred = Q.defer();
		let user = new userModel(this);
		user.save(function (err) {
			if (err) {
				console.log(err);
				deferred.reject(false);
			}
			deferred.resolve(true);
		})
		return deferred.promise;
	}

	User.All = async function (obj) {
		let users = await(userModel.find({}, function (err, users) {
			if (err) return null;
		}));

		return users;
	};

	User.Find = async function (obj) {
		let users = await(userModel.findOne(obj,
			function (err, users) {
				if (err)
					return null;
			}));

		return users;
	};

	return User;
}