const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const https = require('https');
const http = require('http');

const routes = require('./routes/index.js');
const darkmatter = require('./darkmatter/darkmatter.js');

const port = 3000;

let options;

try {
	options = {
		key: fs.readFileSync('./darkmatter/ssl/gocode.key'),
		cert: fs.readFileSync('./darkmatter/ssl/gocode.crt')
	};
}
catch (e) {
	console.log("No SSL cert detected")
}

let app = express();

app.set('jwtSecret', darkmatter.jsonWebTokensSecret);

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


if (options) {
	https.createServer(options, app).listen(port, () => {
		console.log("Listening Over SSL on Port: ", port);
	})
}
else {
	http.createServer(app).listen(port, () => {
		console.log("Listening Without SSL on Port: ", port);
	});
}
