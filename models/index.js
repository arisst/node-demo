module.exports = function(connection) {
	return {
		users:require('./users')(connection),
		posts:require('./posts')(connection),
		connections:require('./connections')(connection)
	};
};