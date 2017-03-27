module.exports = function (mongoose) {
	const Q = require('q');

	const Schema = mongoose.Schema;

	const teamMemberSchema = new Schema({
		userId: {type: String, required: true},
		firstName: {type: String, required: true},
		lastName: {type: String},
		occupation: {type: String, required: true},
		wage: {type: Number, required: true},
		wageType: {type: Number, required: true},
		startDate: {type: Date},
		createdAt: {type: Date, required: true},
		updatedAt: {type: Date, required: true},
		profileImage: {type: String},
	});

	const teamMemberModel = mongoose.model('teamMember', teamMemberSchema);

	let TeamMember = function (userId, firstName, lastName, occupation, wage,
							   wageType, startDate, createdAt, updatedAt,
							   profileImage) {
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.occupation = occupation;
		this.wage = wage;
		this.wageType = wageType;
		this.startDate = startDate;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.profileImage = profileImage;

		this.save = save;
	}

	let save = function () {
		let deferred = Q.defer();
		let teamMember = new teamMemberModel(this);
		teamMember.save(function (err) {
			if (err) {
				console.log(err);
				deferred.reject(false);
			}
			deferred.resolve(true);
		})
		return deferred.promise;
	}

	TeamMember.All = async function (obj) {
		let teamMembers = await(teamMemberModel.find({}, function (err, members) {
			if (err) return null;
		}));

		return teamMembers;
	};

	TeamMember.Find = async function (obj) {
		let teamMembers = await(teamMemberModel.find(obj, function (err, members) {
			if (err) return null;
		}));

		return teamMembers;
	};

	TeamMember.Delete = function (obj) {
		console.log("Deleting Team Member");
		let deferred = Q.defer();
		console.log(obj);
		teamMemberModel.findOneAndRemove({_id: obj.id}, function (err) {
			console.log("FIND ONE");
			if (err) {
				console.log("ERROR", err);
				deferred.reject(false);
			}
			else {
				console.log("SUCCESS!");
				deferred.resolve(true);
			}
		});
		return deferred.promise;
	}

	return TeamMember;
}