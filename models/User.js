module.exports = (mongoose) => {
	const Q = require('q');
	const bcrypt = require('bcrypt')

	const saltRounds = 10;

	const Schema = mongoose.Schema;
	const userSchema = new Schema({
		username: {type: String, unique: true, required: true, dropDups: true},
		passwordHash: String,
		hashSalt: String
	});

	const userModel = mongoose.model('User', userSchema);

	class User {
		constructor(username, passwordHash, hashSalt) {
			this.username = username;
			this.passwordHash = passwordHash;
			this.hashSalt = hashSalt;
		};

		async save() {
			let deferred = Q.defer();
			let user = new userModel(this);
			try {
				let save = await user.save();
				deferred.resolve(save);
			}
			catch (e) {
				console.log("Failed to insert user into the database - Probably a duplicate username");
				deferred.reject("/models/User.js - save(): " + e);
			}

			return deferred.promise;
		}
	}


	User.All = async () => {
		try {
			let users = await userModel.find({});
			return users;
		}
		catch (e) {
			console.log("Failed to get all users: " + e);
		}

	};

	User.Find = async (idObj) => {
		try {
			let user = await userModel.findOne(idObj);
			return user;
		}
		catch (e) {
			console.log("Failed to get a user: " + e);
		}

	};

	User.GenerateSaltAndHash = async (password) => {
		try {
			let salt = await bcrypt.genSalt(saltRounds);
			let hash = await bcrypt.hash(password, salt);
			return {salt: salt, hash: hash};
		}
		catch (e) {
			console.log("Failed to generate salt and hash: " + e);
		}

	};

	User.ValidatePassword = async (password, hash) => {
		try {
			let isValid = await bcrypt.compare(password, hash);
			return isValid;
		}
		catch (e) {
			console.log("Failed to validate password: " + e);
		}

	};


	return User;
}