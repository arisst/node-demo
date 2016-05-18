var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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

app.post('/follow', function (req, res) {
	models.connections.addFollowing(req.body.userId, req.body.connectTo, function(insertId) {
		var out = {id:insertId};
		if(insertId > 0){
			out.message = 'follow berhasil';
		}else{
			out.message = 'follow gagal';
		}

	    res.json(out);
	});

});

app.get('/isfollower/:userId/:connectTo', function (req, res) {
	models.connections.isFollower(req.params.userId, req.params.connectTo, function(data) {
		var out = {data:data};
		res.json(out);
	})
});

app.get('/following/:userId', function (req, res) {
	models.connections.getFollowing(req.params.userId, function(data) {
		var out = {data:data};
		res.json(out);
	})
});

app.get('/follower/:userId', function (req, res) {
	models.connections.getFollower(req.params.userId, function(data) {
		var out = {data:data};
		res.json(out);
	})
});

app.post('/posts', function (req, res) {
	models.posts.addPost(req.body.userId, req.body.post, function(postId) {
		var out = {id:postId};
		if(postId > 0){
			out.message = 'add post berhasil';
		}else{
			out.message = 'add post gagal';
		}

	    res.json(out);
	});

});

app.get('/timeline/:userId', function (req, res) {
	models.posts.getTimeline(req.params.userId, function(data) {
		var out = {data:data};
		res.json(out);
	})
});

app.post('/auth', function(req, res) {
	models.users.auth(req.body.username, req.body.password, function(data) {
		res.json(data);
	})
});

app.listen(port, hostname, function () {
    console.log('Server running at http://'+hostname+':'+port+'/');
});

console.log('end of program');
