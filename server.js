var Hapi = require('hapi');
var config = require('./server/config/settings');

// Create a server with a host and port
var server = new Hapi.Server();

server.connection({
    host: config.host,
    port: config.port
});

// Add the route
server.route(require('./server/config/routes'));

// Start the server
server.start(function() {
	console.log('server is listening on port : ', config.port);
});
