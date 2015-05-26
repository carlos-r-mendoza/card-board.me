'use strict';
var socketio = require("socket.io");
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on("connection", function (socket) {
    	console.log("INSIDE SOCKET!");
        socket.on('join', function(username){
            socket.username = username;
        });
    	
        socket.on("messages", function(data){
            console.log("MESSAGE", data);
            var username = socket.username;

            socket.broadcast.emit("messages", data);

            socket.emit("messages", data);
    	});
    	
        // socket.emit('messages', { hello: "world" });
        // Now have access to socket, wowzers!
    });
    
    return io;

};
