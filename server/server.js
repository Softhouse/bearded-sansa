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
    backend.get('http://xyz.softhouse/api/employees/', function (data, response) {
        if (data.length) {
            res.send(data);
        }
    }, {
        'Cookie': req.header('cookie')  // forward authentication cookie
    });
});

app.get('/me', function (req, res) {
    backend.get('http://xyz.softhouse.se/api/employees/?email=' + req.headers['x-forwarded-email'], function (data, response) {
        if (data.length) {
            res.send(data[0]);
        }
        else {
            res.status(404).send({error: 'Who are you?'});
        }
    });

});

app.get('/:email', function (req, res) {
    var email = req.params.email;
    backend.get('http://xyz.softhouse.se/api/employees/?email=' + email, function (data, response) {
        if (data.length) {
            res.send(data[0]);
        }
        else {
            res.status(404);
            res.send({error: 'Employee not found: ' + email});
        }
    });
});

var server = app.listen(9000, function () {
    console.log('Server started: http://localhost:%s/', server.address().port);
});
