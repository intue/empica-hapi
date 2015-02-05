exports.register = function(server, options, next) {
    var io = require('socket.io').listen(server.select('chat').listener,{log:true});
    io.sockets.on('connection', function (socket) {
       console.log('a user connected');
   });
};

exports.register.attributes = {
    name: 'socket.io'
};