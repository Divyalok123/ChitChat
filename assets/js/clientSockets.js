var socket = io();

/* Chatbox User Button */
var chatboxSidebarButton = document.querySelectorAll('.chatbox-sidebar-button');
var currentUserInChat;

function changeChatUser() {

    axios.get('/userdetails', {
        params: {
            userid: this.id
        }
    })
    .then(data => {
        currentUserInChat = data.data;
    })
    .catch(err => {
        console.log('Error occured in axios request from chatroom.js');
        console.log('Error: ', err);
    })

}

Array.from(chatboxSidebarButton).forEach(userButton => 
    userButton.addEventListener('click', changeChatUser)
);

/* Submit handler */
var messageSendButton = document.querySelector('#message-send');
var messageInput = document.querySelector('#message-input');
var messageForm = document.querySelector('#input-form');

function submitInput(e) {
    if(e.keyCode == 13) {
        messageForm.submit();   
    }
}

messageSendButton.addEventListener("keydown", submitInput);
messageInput.addEventListener("keydown", submitInput);

/* handling client sockets */
var urlObject = window.location;
var thisuserid = urlObject.pathname.split('/')[2];


socket.on('user connected', (arg) => {
    console.log(arg);
})

socket.emit('hey', thisuserid);
