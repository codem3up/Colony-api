module.exports = function (mongoose) {
	const Q = require('q');

	const Schema = mongoose.Schema;
	const publicOccupationSchema = new Schema({
		stateabbrv: {type: String, required: true},
		areaname: {type: String, required: true},
		occcode: {type: Number, required: true},
		codetitle: {type: String, required: true},
		ratetype: {type: Number, required: true},
		ratetydesc: {type: String},
		empcount: {type: Number},
		mean: {type: Number, required: true},
		median: {type: Number, required: true},
		pct10: {type: Number, required: true},
		pct25: {type: Number, required: true},
		pct75: {type: Number, required: true},
		pct90: {type: Number, required: true},

	});

	const publicOccupationModel = mongoose.model('publicOccupation', publicOccupationSchema);
	const PublicOccupation = function (stateabbrv, areaname, occcode, codetitle, ratetype,
							   ratetydesc, empcount, mean, median,
							   pct10, pct25, pct75, pct90) {
		this.stateabbrv = stateabbrv;
		this.areaname = areaname;
		this.occcode = occcode;
		this.codetitle = codetitle;
		this.ratetype = ratetype;
		this.ratetydesc = ratetydesc;
		this.empcount = empcount;
		this.mean = mean;
		this.median = median;
		this.pct10 = pct10;
		this.pct25 = pct25;
		this.pct75 = pct75;
		this.pct90 = pct90;

		this.save = save;
	}

	let save = function () {
		let deferred = Q.defer();

		let publicOccupation = new publicOccupationModel(this);
		publicOccupation.save(function (err) {
			if (err) {
				console.log(err);
				deferred.reject(false);
			}
			deferred.resolve(true);
		})
		return deferred.promise;
	}

	PublicOccupation.All = async function (obj) {
		let publicOccupations = await(publicOccupationModel.find({}, function (err, members) {
			if (err) return null;
		}));

		return publicOccupations;
	};

	PublicOccupation.Find = async function (obj) {
		let publicOccupations = await(publicOccupationModel.find(obj, function (err, members) {
			if (err) {
				console.log(err); 
				return null;
			}
		}));
		return publicOccupations;
	};

	PublicOccupation.Delete = function (obj) {
		console.log("Deleting Team Member");
		let deferred = Q.defer();
		console.log(obj);
		publicOccupationModel.findOneAndRemove({_id: obj.id}, function (err) {
			console.log("FIND ONE");
			if (err) {
				console.log("ERROR", err);
				deferred.reject(false);
			}
			else {
				console.log("SUCCESS!");
				deferred.resolve(true);
			}
		});
		return deferred.promise;
	}

	return PublicOccupation;
}