var Client = require('node-rest-client').Client;
var backend = new Client();

var path = require('path');
var express = require('express');
var app = express();

app.use('/docs', express.static(path.join(__dirname, 'dist/')));

app.get('/kalle', function (req, res) {
    console.log("ASD");

    res.send('Your email is: ' + req.headers['x-forwarded-email'] + ' and your accname: ' + req.headers['x-forwarded-user']);
});

app.get('/', function (req, res) {
    res.send([{"dummyCv": "Dummy CV information 1"}, {"dummyCv": "Dummy CV information 2"}]);
    //Support for search
    //e.g. GET /employees/me?id=1234
});

app.get('/me', function (req, res) {
    backend.get('http://localhost:3232/employees/?email=' + req.headers['x-forwarded-email'], function (data, response) {
        if (data.length) {
            res.send(data[0]);
        }
        else {
            res.status(404);
            res.send({error: 'Who are you?'});
        }
    });

});

app.get('/:email', function (req, res) {
    res.send({"dummyCv": "Dummy CV information"});
    //Support for search
    //e.g. GET /employees/me?id=1234
    console.log(req.params.email)
});

var server = app.listen(9000, function () {
    console.log('Server started: http://localhost:%s/', server.address().port);
});
