/* Chatbox Hamburger Icon & sidebar*/
var hamburger = document.getElementById('chatbox-hamburger');
var sidebar = document.getElementById('chatbox-sidebar');
var chatboxContent = document.querySelector('.chatbox-content');
var flag = 1;

function changeburger() {
    if(flag) {
        hamburger.classList.add('transform-burgeritem');
        sidebar.style.width = "200px";
        sidebar.style.borderRight = "1px solid white";
        chatboxContent.style.marginLeft = "200px";
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

