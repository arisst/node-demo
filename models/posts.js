// models/posts.js
module.exports = function(connection) {
	return {
		addPost: function(userId, post, callback) {
			var sql = 'insert into posts (userId, post, timestamp) values ("'+userId+'", "'+post+'", NOW())';
			var result = 0;
            
            connection.query(sql, function(error, result) {
                if(!error) {
                    result = result.insertId;
                }
                else {
                    result = -1;
                }
                callback(result);
            });
		},

		getTimeline: function(userId, callback) {
            // var sql = 'SELECT posts.*, users.username FROM connections, posts, users WHERE connections.userId = '+userId+' AND posts.userId = connections.connectTo AND posts.userId = users.userId ORDER BY timestamp DESC LIMIT 10';
			var sql = 'SELECT posts.*, users.username FROM connections, posts, users WHERE (connections.userId = '+userId+' AND posts.userId = users.userId) OR posts.userId = connections.connectTo  ORDER BY timestamp DESC LIMIT 10';
			var result = 0;
            
            connection.query(sql, function(error, result) {
                if(!error) {
                    result = result;
                }
                else {
                    result = -1;
                }
                callback(result);
            });	
		}
	}
}