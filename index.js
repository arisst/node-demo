// index.js

var http = require('http');
var hostname = '127.0.0.1';
var port = 1337;
var pages = {
	home:'Home page',
	about:'About page',
	blog:'Blog page',
};

var run = http.createServer(function(req, res) {
	var page = 'Page not found';
	var code = 404;

	if(req.url === '/home' || req.url === '/'){
		page = pages.home;
		code = 200;
	}
	else if(req.url === '/blog'){
		page = pages.blog;
		code = 200;
	}
	else if(req.url === '/about'){
		page = pages.about;
		code = 200;
	}

	var json = JSON.stringify({page:page});
	res.writeHead(code, {'Content-Type': 'application/json'});
	res.end(json);
});

run.listen(port, hostname, function() {
	console.log('Server running at http://'+hostname+':'+port+'/');
});