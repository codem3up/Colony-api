const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gocode');

const User = require('./user.js')(mongoose);
const TeamMember = require('./team_member.js')(mongoose);
const PublicOccupation = require('./public_occupation.js')(mongoose);
const MinimumWage = require('./minimum_wage.js')(mongoose);
const PersonalIncome = require('./personal_income.js')(mongoose);

module.exports = {
	User: User,
	TeamMember: TeamMember,
	PublicOccupation: PublicOccupation,
	MinimumWage: MinimumWage,
	PersonalIncome: PersonalIncome,
	isValidId: isValidId
}

function isValidId(obj) {
	if (obj.match(/^[0-9a-fA-F]{24}$/)) {
		return true;
	}
	else {
		return false;
	}
}
