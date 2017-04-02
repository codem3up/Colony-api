const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const routes = require('./routes/index.js');
const darkmatter = require('./darkmatter/darkmatter.js');

const port = 3000;

let app = express();

app.set('jwtSecret', darkmatter.jsonWebTokens.secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	res.send(err);
});

// production error handler no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.listen(port)
console.log("Listening on Port: ", port)

module.exports = app;
