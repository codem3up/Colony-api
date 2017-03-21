var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gocode');

var Role = require('./objects/Role.js')(mongoose);
var User = require('./objects/User.js')(mongoose);
var TeamMember = require('./objects/TeamMember.js')(mongoose);


module.exports = {
	Role: Role,
	User: User,
	TeamMember: TeamMember,
	isValidId: isValidId
}

//global functions go here
function isValidId(obj) {
	if(obj.match(/^[0-9a-fA-F]{24}$/)) {
		console.log("TRUE");
		return true;
	} else{
		console.log("FALSE");
		return false;
	}
}