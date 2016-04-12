var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
var hostname = '127.0.0.1';
var port = 1337;
var models = require('./models');

app.post('/users', function (req, res) {
    res.json({hello:'world!'});
});

app.get('/users', function (req, res) {
    res.json({hello:'world!'});
});

app.listen(port, hostname, function () {
    console.log('Server running at http://'+hostname+':'+port+'/');
});

console.log('end of program');