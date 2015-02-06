var settings = require('../config/settings');
var fs = require('fs');
var processor = require(settings.rootPath + '/lib/payloadProcessor');

exports.register = function(server, options, next) {
    var io = require('socket.io').listen(server.select('chat').listener,{log:true});
    io.sockets.on('connection', function (socket) {
       console.log('a user connected');

        socket.on('disconnect', function(){
			console.log('user disconnected');
		});

		socket.on('newchat',function(payload){
			processor.processMedia(payload.media, function(err, mediaContent){
				if(err){
					return;
				}

				io.emit('newchat:reply', mediaContent);
			});
			// fs.readFile(__dirname + '/../data/webmsample', 'utf8', function (err,content) {
			//   if (err) {
			//     return console.log(err);
			//   }
			//   io.emit('newchat:reply', content);
			// });
	    });
   });
};

exports.register.attributes = {
    name: 'socket.io'
};