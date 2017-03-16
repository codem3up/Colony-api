var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gocode');

var Role = require('./objects/Role.js')(mongoose);
var User = require('./objects/User.js')(mongoose);


module.exports = {
	Role: Role,
	User: User
}