var socket = io();
var urlObject = window.location;


socket.on('user connected', (arg) => {
    console.log(arg);
})

socket.emit('hey', urlObject.pathname.split('/')[2]);
