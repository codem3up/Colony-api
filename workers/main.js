const config = require('./config.js')
const request = require('request-promise');

const models = require('../models/index.js');
const mongoose = require('mongoose');

const occupationEndpoint = 'https://data.colorado.gov/resource/vu7j-izta.json';
const incomeEndpoint = 'https://data.colorado.gov/resource/udxx-a7kq.json';

const publicOccupation = require('./public_occupation_worker.js');
const personalIncome = require('./personal_income_worker.js');

let argument = process.argv[2];

init();

function init(){
	switch(argument) {
		case "0":
			console.log("Getting Public occupation Data");
			publicOccupation(occupationEndpoint);
			break;
		case "1":
			console.log("Getting Personal Income Data");
			personalIncome(incomeEndpoint);
			break;
		default:
			console.log("Running all");
			publicOccupation(occupationEndpoint); 
			personalIncome(incomeEndpoint);
			break;
	}
}