var Client = require('node-rest-client').Client;
var backend = new Client();

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use('/docs', express.static(path.join(__dirname, 'dist/')));

app.get('/kalle', function (req, res) {
    console.log("ASD");

    res.send('Your email is: ' + req.headers['x-forwarded-email'] + ' and your accname: ' + req.headers['x-forwarded-user']);
});

app.get('/', function (req, res) {
    backend.get('http://xyz/api/employees/', function (data, response) {
        res.send(data);
    });
});

app.put('/me', function (req, res) {
    req.body.email = req.headers['x-forwarded-email'];
    backend.get('http://xyz/api/employees/?email=' + req.headers['x-forwarded-email'], function (data, response) {
        if (data.length) {
            var id = data[0]._id;
            backend.put('http://xyz/api/employees/' + id, {
                data: req.body,
                headers: {"Content-Type": "application/json"}
            }, function (data, response) {
                res.send(data);
            });
        }
        else {
            backend.post('http://xyz/api/employees/', {
                data: req.body,
                headers: {"Content-Type": "application/json"}
            }, function (data, response) {
                res.send(data);
            });
        }
    });

});


app.get('/me', function (req, res) {
    backend.get('http://xyz/api/employees/?email=' + req.headers['x-forwarded-email'], function (data, response) {
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
    if (req.headers['x-forwarded-email'] != email) {
        res.status(401).send({error: 'Unauthorized'});
    }
    backend.get('http://xyz/api/employees/?email=' + email, function (data, response) {
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
