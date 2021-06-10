const socketio = require('socket.io');
const axios = require('axios');
const User = require('../models/user');

let users = [];

module.exports = (server) => {
    var io = socketio(server);

    io.on('connection', async (socket) => {
        socket.emit('user connected', "connected");
        console.log(socket.id);
        socket.on('hey', (arg) => {console.log(arg)});
    })
    
}

