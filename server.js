
var server = require('./hapi');
var config = require('./server/config/settings');

server.connection({
    port: config.app.port,
    labels: config.app.lable,
});

server.connection({
    port: config.chat.port,
    labels: config.chat.lable,
});

// Bootstrap Hapi Server Plugins
require('./server/config/plugins');

// Add the route
server.select(config.app.lable).route(require('./server/config/routes'));

// Start the server
server.start(function() {
	console.log('app server is listening on port : ', config.app.port);
	console.log('chat server is listening on port : ', config.chat.port);
});

