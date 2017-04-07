module.exports = (mongoose) => {
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
		location: {type: Number}
	});

	const teamMemberModel = mongoose.model('teamMember', teamMemberSchema);
	
	/**
	 * @class {object} TeamMember
	 */
	class TeamMember {
		constructor(userId, firstName, lastName, occupation, wage,
					wageType, startDate, createdAt, updatedAt,
					profileImage, location) {
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
			this.location = location;
		};

		/**
		 * @function save
		 * @desc Saves TeamMember object to db
		 */
		async save() {
			let d = Q.defer();
			let teamMember = new teamMemberModel(this);
			try {
				let save = await teamMember.save();
				d.resolve(save);
			}
			catch (e) {
				console.log("Failed to insert team member into the database");
				d.reject("Error: /models/TeamMember.js - save(): " + e);
			}

			return d.promise;
		}

	}

	/**
	 * @function All
	 * @param {object} obj 
	 * @desc Returns TeamMember object from database that match objects properties
	 * @returns {array} returns array of TeamMember objects
	 */
	TeamMember.All = async (obj) => {
		try {
			let teamMembers = await teamMemberModel.find(obj);
			return teamMembers;
		}
		catch (e) {
			console.log("Failed to get all team members: " + e);
		}

	};

	/**
	 * @function Find
	 * @param {object} obj 
	 * @desc Returns one TeamMember object from database that match objects properties
	 * @returns {Object} returns TeamMember object
	 */
	TeamMember.Find = async (obj) => {
		try {
			let member = await teamMemberModel.findOne(obj);
			if (!member) {
				member = {};
			}
			return member;
		}
		catch (e) {
			console.log("Failed to get a team member: " + e);
		}

	};

	/**
	 * @function Delete
	 * @desc Deletes PublicOccupation object from db
	 */
	TeamMember.Delete = async (obj) => {
		console.log("Deleting Team Member");
		let d = Q.defer();
		try {
			let remove = await teamMemberModel.findOneAndRemove({_id: obj.id});
			d.resolve(remove)
		}
		catch (e) {
			console.log("Failed to delete a team member: " + e)
			d.reject("Error: /models/TeamMember.js - TeamMember.Delete(): " + e)
		}

		return d.promise;
	}


	return TeamMember;
}