var path = require('path');

module.exports = {
	rootPath: path.normalize(__dirname + '/../..'),
	app: {
		port: parseInt(process.env.PORT, 10) || 3000,
    	host: '0.0.0.0',
    	lable: 'app'
	},
	chat: {
		port: parseInt(process.env.PORT, 10) || 3030,
    	host: '0.0.0.0',
    	lable: 'chat'
	},
};