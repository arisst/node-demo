// models/users.js

module.exports = function(connection) {
	return {
		insert:function(user, callback){

            var sql = "INSERT INTO users (username, password, email) SELECT '"+user.username+"',md5('"+user.password+"'),'"+user.email+"' FROM DUAL WHERE NOT EXISTS (SELECT username FROM users WHERE username='"+user.username+"')";
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

        getUserByUsername:function(username, callback) {
        	var sql = "select * from users where username='"+username+"'";
        	var result = 0;

        	connection.query(sql, function(error, result) {
        		if(!error){
        			result = result[0];
        		}
        		else{
        			result = -1;
        		}
        		callback(result);
        	})
        },

        nextweek:function(){
			var today = new Date();
			var nextweek = new Date(
				today.getFullYear(),
				today.getMonth(),
				today.getDate()+7,
				today.getHours(),
				today.getMinutes(),
				today.getSeconds()
			);
			return nextweek;
		},

		auth: function(username, password, callback){

		    var ths = this;
		    crypto = require('crypto');
		    password = crypto.createHash('md5').update(password).digest('hex');
		    var sql = 'SELECT * FROM `users` WHERE `username` = "'+username+'" AND `password` = "'+password+'"';

		    connection.query(sql, function (error, results, fields) {
		        var user = {};
		        if(!error) {
		            if(results.length > 0){
		                user = results[0];
		                user.status = true;

		                var key = '123';

		                var token = {};
		                token.id = user.userId;
		                token.expired = ths.nextweek();
		                console.log(token.expired);
		                token.hash = key+token.expired+user.userId;
		                token.hash = crypto.createHash('md5').update(token.hash).digest('hex');

		                token = JSON.stringify(token);
		                token = new Buffer(token).toString('base64');

		                user.token = token;
		                var picHash = crypto.createHash('md5').update(user.email.toLowerCase()).digest("hex");
		                user.pic = 'http://www.gravatar.com/avatar/'+picHash;

		                delete user.password;
		            }
		            else {
		                user = {
		                    status:false,
		                    message:'ok'
		                };
		            }
		        }
		        else {
		            console.log(error[0]);
		            user = {
		                status:false,
		                message:'Some error: '+error.code
		            };
		        }

		        callback(user);
		    });
		},

		validateToken: function(token) {
			token = new Buffer(token, 'base64').toString();
			token = JSON.parse(token);

			var today = new Date();

			if(new Date() > new Date(token.expired)){
				return -1;
			} 

			var key = '123';
			var hash = key+token.expired+token.id;
			hash = crypto.createHash('md5').update(hash).digest('hex');

			if(hash !== token.hash){
				return 0;
			}
			return 1;
		}
	}
}