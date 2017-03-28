const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gocode');

const User = require('./objects/User.js')(mongoose);
const TeamMember = require('./objects/TeamMember.js')(mongoose);
const PublicOccupation = require('./objects/PublicOccupation.js')(mongoose);


module.exports = {
	User: User,
	TeamMember: TeamMember,
	PublicOccupation: PublicOccupation,
	isValidId: isValidId
}

//global functions go here
function isValidId(obj) {
	if (obj.match(/^[0-9a-fA-F]{24}$/)) {
		console.log("TRUE");
		return true;
	} else {
		console.log("FALSE");
		return false;
	}
}