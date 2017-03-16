module.exports = function(mongoose) {
	var async = require('asyncawait/async');
	var await = require('asyncawait/await');

	var Schema = mongoose.Schema;

	var roleSchema = new Schema({
		name: String,
		salary: Number
	});

	var roleModel = mongoose.model('Role', roleSchema);

	function Role(name, salary) {
		this.name = name;
		this.salary = salary;
		this.save = save;
	}


	function save() {
		var role = new roleModel(this);
		role.save(function(err){
			if(err){
				console.log(err);
			} else{
				console.log("Saved");
			}
		});
	}

	Role.Find = async (function(){
		var roles = await(roleModel.find({}, function(err, roles) {
			if(err) return null;
		}));
		return roles;
	});

	return Role;
}