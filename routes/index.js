const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/api/docs', (req, res, next) => {
	res.render('documentation');
})

require('./user')(router);
require('./public_occupation')(router);
require('./team_member')(router);
require('./personal_income')(router);

module.exports = router;

