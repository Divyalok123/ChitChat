window.onload = function() {

/* Chatbox Hamburger Icon & sidebar */

var hamburger = document.querySelector('#chatbox-hamburger');
var sidebar = document.querySelector('.chatbox-sidebar');
var chatboxContent = document.querySelector('.chatbox-content');
var sidebarDivs = document.querySelectorAll('.sidebar-items');
var elementsInSidebar = document.querySelectorAll('.sidebar-items > p');
var messageSendButton = document.querySelector('#message-send');
var messageInput = document.querySelector('#message-input');
var messageForm = document.querySelector('#input-form');

function submitInput(e) {
    if(e.keyCode == 13) {
        messageForm.submit();   
    }
}

var flag = 1;
function changeburger() {
    if(flag) {
        let mediasize = window.matchMedia("(max-width: 500px)");
        if(mediasize.matches) {
            // console.log('matches');
            Array.from(elementsInSidebar).forEach((element) => {
                element.style.padding = "2px 2px 2px 2px";
            })

            Array.from(sidebarDivs).forEach((element) => {
                element.style.marginLeft = "5px";
            })
        }

        let value = (mediasize.matches) ? "150px" : "200px";
        hamburger.classList.add('transform-burgeritem');
        sidebar.style.width = value;
        sidebar.style.borderRight = "1px solid white";
        chatboxContent.style.marginLeft = value;
        flag = 0;
    } else {
        hamburger.classList.remove('transform-burgeritem');
        sidebar.style.width = "0px";
        sidebar.style.borderRight = "none";
        chatboxContent.style.marginLeft = "0px";
        flag = 1;
    }
}

hamburger.addEventListener("click", changeburger);
messageSendButton.addEventListener("keydown", submitInput);
messageInput.addEventListener("keydown", submitInput);

/* Chatbox User Button */
var chatboxUserButton = document.querySelectorAll('.chatbox-user-button');
var currentUserInChat;
function changeChatUser() {

    axios.get('/userdetails', {
        params: {
            userid: this.id
        }
    })
    .then((data) => {
        currentUserInChat = data.data;
        // console.log(currentUserInChat);
        
    })
    .catch((err) => {
        console.log('Error occured in axios request from chatroom.js');
        console.log('Error: ', err);
        console.log('Error.response: ', err.response);
    })


}

Array.from(chatboxUserButton).forEach((userButton) => userButton.addEventListener('click', changeChatUser));

}