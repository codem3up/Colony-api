module.exports = (mongoose) => {
	const Q = require('q');

	const Schema = mongoose.Schema;
	const minimumWageSchema = new Schema({
		year: {type: Number},
		minimumWage : {type: Number},
		tippedWage: {type: Number}
	});

	const minimumWageModel = mongoose.model('minimumWage', minimumWageSchema);

	/**
	 * @class {object} MinimumWage
	 */
	class MinimumWage {
		constructor(year, minimumWage, tippedWage) {
			this.year = year;
			this.minimumWage = minimumWage;
			this.tippedWage = tippedWage;
		}
	
	/**
	 * @function save
	 * @desc Saves MinimumWage object to db
	 */
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

	/**
	 * @function All
	 * @param {object} obj 
	 * @desc Returns MinimumWage object from database that match objects properties
	 * @returns {array} returns array of MinimumWage objects
	 */
	MinimumWage.All = async (obj) => {
		try {
			let minimumWages = await minimumWageModel.find(obj);
			return minimumWages;
		}
		catch (e) {
			console.log("Failed to get minimum wages : " + e);
		}

	};

	/**
	 * @function Find
	 * @param {object} obj 
	 * @desc Returns one MinimumWage object from database that match objects properties
	 * @returns {Object} returns MinimumWage object
	 */
	MinimumWage.Find = async (obj) => {
		try {
			let minimumWages = await minimumWageModel.findOne(obj);
			return minimumWages;
		}
		catch (e) {
			console.log("Failed to get an minimum wage : " + e);
		}
	};

	/**
	 * @function Delete
	 * @desc Deletes MinimumWage object from db
	 */
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