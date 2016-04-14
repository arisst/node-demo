// models/connections.js
module.exports = function(connection) {
	return {
		addFollowing: function(userId, connectTo, callback) {
			var sql = 'insert into connections (userId, connectTo) values ("'+userId+'", "'+connectTo+'")';
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

		isFollower: function(userId, connectTo, callback) {
			var sql = 'select connectionId from connections where userId = '+userId+' and connectTo = '+connectTo;
			var result = 0;
            console.log(sql);
            connection.query(sql, function(error, result) {
                if(!error) {
                    result = result[0].connectionId;
                }
                else {
                    result = -1;
                }
                callback(result);
            });	
		},

		getFollowing: function(userId, callback) {
			var sql = 'SELECT users.* FROM connections, users WHERE connections.userId = '+userId+' AND connections.connectTo = users.userId AND connections.connectTo != '+userId+' ORDER BY connectionId DESC LIMIT 10';
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
		},

		getFollower: function(userId, callback) {
			var sql = 'SELECT users.* FROM connections, users WHERE connections.connectTo = '+userId+' AND connections.userId = users.userId AND connections.userId != '+userId+' ORDER BY connectionId DESC LIMIT 10';
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
		},


	}
};