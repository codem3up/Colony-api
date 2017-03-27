var express = require('express');
var router = express.Router();
var request = require('request');
var library = require('library');

require('./user')(router);
require('./public')(router);
require('./team')(router);


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/role', function (req, res, next) {
	library.Role.Find().then(function (roles) {
		res.setHeader('Content-Type', 'application/json');
		res.send(roles);
	})
})

router.post('/role/new', function (req, res, next) {
	var roleParams = req.body.Role;
	var role = new library.Role(roleParams.name, roleParams.salary);
	role.save();
	res.render('index');
});

module.exports = router;
