module.exports = function() {
	return {
		users:require('./users')(),
		posts:require('./posts')(),
		connections:require('./connections')()
	};
};