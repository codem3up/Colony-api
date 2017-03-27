const express = require('express');
const router = express.Router();

require('./user')(router);
require('./public')(router);
require('./team')(router);


/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index');
});

module.exports = router;
