const express = require('express');
const router = express.Router();

require('./user')(router);
require('./public_occupation')(router);
require('./team_member')(router);
require('./personal_income')(router);


/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index');
});


module.exports = router;

