// Load the server
var settings = require('./settings');
var server = require(settings.rootPath + '/hapi');

server.register([
		{
			register: require('../plugin/socketIo')
		}
	], function (err) {
	    if (err) {
	        console.error('Failed to load a plugin:', err);
	        throw err;
	    }
});