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
        			// console.log(result.username);
        			result = result[0];
        		}
        		else{
        			result = -1;
        		}
        		callback(result);
        	})
        }
	}
}