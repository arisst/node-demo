// index.js

var http = require('http');
var hostname = '127.0.0.1';
var port = 1337;
var models = {
	users:require('./models/users')(),
	posts:require('./models/posts')(),
	connections:require('./models/connections')(),
};

var run = http.createServer(function(req, res) {
	var segment = req.url.split('/');
	console.log(segment[1]);

	var json = {status:'not oke'};

	if(models[segment[1]]){
		json = {status:models[segment[1]].get()};
	}
	json = JSON.stringify(json);
	res.writeHead(200, {'Content-Type': 'application/json'});
	res.end(json);
});

run.listen(port, hostname, function() {
	console.log('Server running at http://'+hostname+':'+port+'/');
});
