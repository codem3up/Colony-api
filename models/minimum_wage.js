module.exports = (mongoose) => {
	const Q = require('q');

	const Schema = mongoose.Schema;
	const minimumWageSchema = new Schema({
		year: {type: Number},
		minimumWage : {type: Number},
		tippedWage: {type: Number}
	});

	const minimumWageModel = mongoose.model('minimumWage', minimumWageSchema);

	class MinimumWage {
		constructor(year, minimumWage, tippedWage) {
            this.year = year;
            this.minimumWage = minimumWage;
            this.tippedWage = tippedWage;
		}

		async save() {
			let d = Q.defer();
			let minimumWage = new minimumWageModel(this);
			try {
				let save = minimumWage.save();
				d.resolve(save);
			}
			catch (e) {
				console.log("Failed to insert minimum wage into the database");
				d.reject("Error: /models/MinimumWage.js - save(): " + e);
			}

			return d.promise;
		}

	}

	MinimumWage.All = async (obj) => {
		try {
			let minimumWages = await minimumWageModel.find(obj);
			return minimumWages;
		}
		catch (e) {
			console.log("Failed to get minimum wages : " + e);
		}

	};

	MinimumWage.Find = async (obj) => {
		try {
			let minimumWages = await minimumWageModel.findOne(obj);
			return minimumWages;
		}
		catch (e) {
			console.log("Failed to get an minimum wage : " + e);
		}
	};

	MinimumWage.Delete = (obj) => {
		let d = Q.defer();
		try {
			let remove = minimumWageModel.findOneAndRemove({_id: obj.id});
			d.resolve(remove);
		}
		catch (e) {
			console.log("Failed to delete minimum wage: " + e)
			d.reject("Error: /models/MinimumWage.js - MinimumWage.Delete(): " + e)
		}

		return d.promise;
	}

	return MinimumWage;
}