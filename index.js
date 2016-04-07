// index.js

var http = require('http');
var hostname = '127.0.0.1';
var port = 1337;

var run = http.createServer(function(req, res) {
	console.log('one request');
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Hello World\n');
});

run.listen(port, hostname, function() {
	console.log('Server running at http://'+hostname+':'+port+'/');
});