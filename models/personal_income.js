module.exports = (mongoose) => {
	const Q = require('q');

	const Schema = mongoose.Schema;
	const personalIncomeSchema = new Schema({
		stateabbrv: {type: String, required: true},
		areaname: {type: String, required: true},
		areatype: {type: Number, required: true},
		area: {type: Number, required: true},
		periodyear: {type: Number, required: true},
		periodtype: {type: Number},
		pertypdesc: {type: String},
		inctype: {type: Number, required: true},
		incdesc: {type: String},
		income: {type: Number},
		incrank: {type: Number},
		population: {type: Number},
	});

	const personalIncomeModel = mongoose.model('personalIncome', personalIncomeSchema);

	/**
	 * @class {object} PersonalIncome
	 */
	class PersonalIncome {
		constructor(stateabbrv, areaname, areatype, area, periodyear,
					periodtype, pertypdesc, inctype, incdesc,
					income, incrank, population) {
			this.stateabbrv = stateabbrv;
			this.areaname = areaname;
			this.areatype = areatype;
			this.area = area;
			this.periodyear = periodyear;
			this.periodtype = periodtype;
            this.pertypdesc = pertypdesc;
			this.inctype = inctype;
			this.incdesc = incdesc;
			this.income = income;
			this.incrank = incrank;
			this.population = population;
		}

		/**
		 * @function save
		 * @desc Saves PersonalIncome object to db
		 */
		async save() {
			let d = Q.defer();
			let personalIncome = new personalIncomeModel(this);
			try {
				let save = personalIncome.save();
				d.resolve(save);
			}
			catch (e) {
				console.log("Failed to insert public income into the database");
				d.reject("Error: /models/PersonalIncome.js - save(): " + e);
			}

			return d.promise;
		}

	}

	/**
	 * @function All
	 * @param {object} obj 
	 * @desc Returns PersonalIncome object from database that match objects properties
	 * @returns {array} returns array of PersonalIncome objects
	 */
	PersonalIncome.All = async (obj) => {
		try {
			let personalIncomes = await personalIncomeModel.find(obj);
			return personalIncomes;
		}
		catch (e) {
			console.log("Failed to get incomes : " + e);
		}

	};

	/**
	 * @function Find
	 * @param {object} obj 
	 * @desc Returns one PersonalIncome object from database that match objects properties
	 * @returns {Object} returns PersonalIncome object
	 */
	PersonalIncome.Find = async (obj) => {
		try {
			let incomes = await personalIncomeModel.findOne(obj);
			return incomes;
		}
		catch (e) {
			console.log("Failed to get an incomes : " + e);
		}
	};

	/**
	 * @function Delete
	 * @desc Deletes PersonalIncome object from db
	 */
	PersonalIncome.Delete = (obj) => {
		let d = Q.defer();
		try {
			let remove = personalIncomeModel.findOneAndRemove({_id: obj.id});
			d.resolve(remove);
		}
		catch (e) {
			console.log("Failed to delete a public income: " + e)
			d.reject("Error: /models/PersonalIncome.js - PersonalIncome.Delete(): " + e)
		}

		return d.promise;
	}

	return PersonalIncome;
}