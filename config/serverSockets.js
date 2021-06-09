const socketio = require('socket.io');
const axios = require('axios');
const User = require('../models/user');

module.exports = (server) => {
    var io = socketio(server);

    io.on('connection', async (socket) => {
        socket.emit('user connected', "connected");

        socket.on('hey', (arg) => {console.log(arg)});
    })
    
}

