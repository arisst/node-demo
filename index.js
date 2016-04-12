var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: true }));

var hostname = '127.0.0.1';
var port = 1337;

//koneksi ke mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
	host 		: 'localhost',
	user 		: 'root',
	password	: 'root',
	database 	: 'twlike'
});

//cek koneksi mysql
/*connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});*/

connection.connect();

var models = require('./models')(connection);

app.post('/users', function (req, res) {
	models.users.insert(req.body, function(insertId) {
		var out = {id:insertId};
		out.message = (insertId > 0) ? 'New user created' : 'User already exist';

	    res.json(out);
	});

});

app.get('/users/:username', function (req, res) {
	models.users.getUserByUsername(req.params.username, function(data) {
		var out = {user:data};
		res.json(out);
	})
});

app.listen(port, hostname, function () {
    console.log('Server running at http://'+hostname+':'+port+'/');
});

console.log('end of program');