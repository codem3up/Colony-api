module.exports = function(mongoose){
	var async = require('asyncawait/async');
	var await = require('asyncawait/await');
	var Q = require('q');

	var Schema = mongoose.Schema;

	var teamMemberSchema = new Schema({
		userId: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String },
		occupation: { type: String, required: true },
		wage: { type: Number, required: true },
		wageType: { type: Number, required: true },
		startDate: { type: Date },
		createdAt: { type: Date, required: true },
		updatedAt: { type: Date, required: true },
		profileImage: { type: String },
	});

	var teamMemberModel = mongoose.model('teamMember', teamMemberSchema);

	function TeamMember(userId, firstName, lastName, occupation, wage, 
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

	function save(){
		var deferred = Q.defer();
		var teamMember = new teamMemberModel(this);
		teamMember.save(function(err){
			if(err){
				console.log(err);
				deferred.reject(false);
			}
			deferred.resolve(true);
		})
		return deferred.promise;
	}

	TeamMember.All = async (function(obj){
		var teamMembers = await(teamMemberModel.find({}, function(err, members) {
			if(err) return null;
		}));

		return teamMembers;
	});

	TeamMember.Find = async (function(obj){
		var teamMembers = await(teamMemberModel.find(obj, function(err, members) {
			if(err) return null;
		}));

		return teamMembers;
	});


	return TeamMember;
}