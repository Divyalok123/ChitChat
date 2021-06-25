var socket = io();

/* Chatbox User Button */
var chatboxSidebarButton = document.querySelectorAll('.chatbox-sidebar-button');
var currentUserInChat;
var currentChatButton;
var currentChatId;

async function changeChatUser() {
    try {
        if(currentChatButton) currentChatButton.classList.remove('setBackgroundForButton');
        currentChatButton = this;
        currentChatButton.classList.add('setBackgroundForButton');
        
        await axios.get('/userdetails', {
            params: {
                userid: this.id
            }
        })
        .then(data => {
            currentUserInChat = data.data;
        })
        .catch(err => {
            console.log('Error occured in clientSockets > changeChatUser > /userdetails: ', err);
        });

        await axios.get('/getchatid', {
            params: {
                receiver: currentUserInChat._id
            }
        })
        .then(data => {
            currentChatId = data.data.chatId;
            // console.log('ClientSockets.js > changeChatUser > currentChatId: ', currentChatId);
        })
        .catch(err => {
            console.log('Error in clientSockets.js > handleChatInputSubmit > /getchatid: ', err);
        })

        

    } catch (err) {
        console.log('Error in clientSockets > changeChatUser: ', err);
        return;
    }
}

Array.from(chatboxSidebarButton).forEach(userButton => 
    userButton.addEventListener('click', changeChatUser)
);

/* Submit handler & client sockets */
var messageSendButton = document.querySelector('#message-send');
var messageInput = document.querySelector('#message-input');
var messageForm = document.querySelector('#input-form');
var chatInputForm = document.querySelector('#input-form');
var urlObject = window.location;
var thisuserid = urlObject.pathname.split('/')[2];

async function handleChatInputSubmit(e) {
    e.preventDefault();

    try {
        if(currentUserInChat == undefined || messageInput.value.length == 0)
            return;

        let messageTime = dayjs().format('D MMM YYYY, HH:mm');

        let newmessage = {
            content: messageInput.value,
            chatId: currentChatId,
            messageTime: messageTime,
            senderId: thisuserid
        }

        console.log("clientSockets > handleChatInputSubmit > NewMessage: ", newmessage);
        console.log("clientSockets > handleChatInputSubmit > Input: ", messageInput.value);

    } catch (err) {
        console.log('Error in clientSockets.js > handleChatInputSubmit async: ', err);
        return;
    }
}

function submitInput(e) {
    if(e.keyCode == 13) {
        messageForm.submit();   
    }
}

socket.on('user connected', (arg) => {
    console.log(arg);
})

// socket.emit('hey', thisuserid);

messageSendButton.addEventListener("keydown", submitInput);
messageInput.addEventListener("keydown", submitInput);
chatInputForm.addEventListener('submit', handleChatInputSubmit);

