var path = require('path');
var express = require('express');
var app = express();

// You probably want to change 'dist/' to '../dist/' for production
app.use('/', express.static(path.join(__dirname, 'dist/')));

app.get('/kalle', function(req, res) {
    console.log("ASD");

    res.send('Your email is: ' + req.headers['x-forwarded-email'] + ' and your accname: ' + req.headers['x-forwarded-user']);
});

app.get('/', function(req, res) {
	res.send([{"dummyCv":"Dummy CV information 1"},{"dummyCv":"Dummy CV information 2"}]);
	//Support for search
	//e.g. GET /employees/me?id=1234
});

app.get('/me', function(req, res) {
	res.send({"dummyCv":"Dummy CV information"});
	//Support for getting a specific attribute
	//e.g. GET /employees/me?attribute=email	
});

app.get('/:email', function(req, res) {
	res.send({"dummyCv":"Dummy CV information"});
	//Support for search
	//e.g. GET /employees/me?id=1234
	console.log(req.params.email)
});

var server = app.listen(9000, function () {
    console.log('Server started: http://localhost:%s/', server.address().port);
});
