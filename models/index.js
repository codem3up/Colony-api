const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gocode');

const User = require('./User.js')(mongoose);
const TeamMember = require('./TeamMember.js')(mongoose);
const PublicOccupation = require('./PublicOccupation.js')(mongoose);

module.exports = {
	User: User,
	TeamMember: TeamMember,
	PublicOccupation: PublicOccupation,
	isValidId: isValidId
}

//global functions go here
function isValidId(obj) {
	if (obj.match(/^[0-9a-fA-F]{24}$/)) {
		return true;
	} else {
		return false;
	}
}
