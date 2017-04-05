module.exports = (router) => {
    const models = require('../models/index.js');
	const request = require('request-promise');

	router.get('/api/personalIncome/all', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		try {
			let incomes = await models.PersonalIncome.All();
			if (!incomes) {
				incomes = [];
			}
			res.send(incomes);
		}
		catch (e) {
			console.error("Error: " + e);
			res.send({error: "Failed to get incomes"});
		}
	})


	router.get('/api/personalIncome/:id', async (req, res, next) => {
		res.setHeader('Content-Type', 'application/json');
		try {
			if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
				res.send({});
			}
			else {
				let personalIncome = await models.PersonalIncome.Find({_id: req.params.id});
				res.send(personalIncome);
			}
		}
		catch (e) {
			console.log("Error: " + e);
			res.send({error: "Failed to get public personalIncome"});
		}
	})
}