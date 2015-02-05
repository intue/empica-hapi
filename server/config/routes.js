var requireDirectory = require('require-directory');

// Bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
var controller = requireDirectory(module, '../controllers');

module.exports = [
	{
		method: 'GET',
	    path:'/health',
	    handler: controller.base.health,
	    config: {
	    	description: 'Updates health status',
	        notes: 'will be used for load balancing api servers',
	        tags: ['api', 'health']
	    }
	}
];