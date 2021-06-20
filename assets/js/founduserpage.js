var addFriendButtons = document.querySelectorAll('.add-friend-button');
var withdrawRequestButtons = document.querySelectorAll('.withdraw-request-button');
var removeFriendButtons = document.querySelectorAll('.remove-friend-button');
var acceptFriendButtons = document.querySelectorAll('.accept-friend-button');
var declineFriendButtons = document.querySelectorAll('.decline-friend-button');

let friendItemDiv = (data, id) => 
    `
    <div class="found-user font-koho in-friends-list" id="friend-<%= ind %>">
        <div class="found-user-img">
            <img src="<%= friend.userid.avatar %>" alt="User Image"> &nbsp; &nbsp;
            <span class="found-user-name"><a href="/profile/<%= friend.userid.id %>"><%= friend.userid.username %></a></span>
        </div>
        <div class="request-buttons">
            <span class="request-button-icon remove-friend-button" data-thisusersid="<%= friend.userid.id %>">
                Remove Friend
            </span>
        </div>
    </div>
    `

let sentRequestItemDiv = (data, id) => 
    `
    <div class="found-user font-koho in-friends-list" id="sentRequest-<%= ind %>">
        <div class="found-user-img">
            <img src="<%= request.userid.avatar %>" alt="User Image"> &nbsp; &nbsp;
            <span class="found-user-name"><a href="/profile/<%= request.userid.id %>"><%= request.userid.username %></a></span>
        </div>
        <div class="request-buttons">
            <span class="request-button-icon withdraw-request-button" data-thisusersid="<%= request.userid.id %>">
                Withdraw
            </span>
        </div>
    </div>
    `

let pendingRequestItemDiv = (data, id) => 
    `
    <div class="found-user font-koho in-friends-list" id="pendingRequest-<%= ind %>">
        <div class="found-user-img">
            <img src="<%= request.userid.avatar %>" alt="User Image"> &nbsp; &nbsp;
            <span class="found-user-name"><a href="/profile/<%= request.userid.id %>"><%= request.userid.username %></a></span>
        </div>
        <div class="request-buttons">
            <span class="request-button-icon remove-friend-button" data-thisusersid="<%= request.userid.id %>">
                Accept
            </span>
            <span class="request-button-icon remove-friend-button" data-thisusersid="<%= request.userid.id %>">
                Decline
            </span>
        </div>
    </div>
    `

function notycallerror(data) {
    new Noty({
        theme: 'sunset',
        text: data,
        type: 'error',
        layout: 'bottomRight',
        timeout: 1500
    }).show();
}

function notycallsuccess(data) {
    new Noty({
        theme: 'sunset',
        text: data,
        type: 'success',
        layout: 'bottomRight',
        timeout: 1500
    }).show();
}

function handleAddFriend() {
    axios.post('/addfriend', {
        userid: this.dataset.thisusersid
    })
    .then(data => {
        // console.log(data);
        if(data.data.type == 'error') {
            notycallerror(data.data.text);
        } else {
            notycallsuccess(data.data.text);
        }
        return;
    })
    .catch(err => {
        console.log('Error in founduserpage > handleaddfriend:', err);
        return;
    })
}

function handleRemoveFriend() {
    axios.get('/removefriend', {
        params: {
            userid: this.dataset.thisusersid
        }
    })
    .then(data => {
        if(data.data.type == 'error') {
            notycallerror(data.data.text);
        } else {
            notycallsuccess(data.data.text);
        }
        return;
    })
    .catch(err => {
        console.log('Error in founduserpage > handleRemoveFriend:', err);
        return;
    })
}

function handleWithdrawRequest() {
    axios.get('/withdrawrequest', {
        params: {
            userid: this.dataset.thisusersid
        }
    })
    .then(data => {
        if(data.data.type == 'error') {
            notycallerror(data.data.text);
        } else {
            notycallsuccess(data.data.text);

            if(this.parentNode.parentNode.id) {
                this.parentNode.parentNode.remove();
                console.log(this.parentNode.parentNode.parentNode.length);
            } else {

            }
        }
        return;
    })
    .catch(err => {
        console.log('Error in founduserpage > handleWithdrawRequest:', err);
        return;
    })
}

function handleAcceptRequest() {
    axios.get('/acceptRequest', {
        params: {
            userid: this.dataset.thisusersid
        }
    })
    .then(data => {
        if(data.data.type == 'error') {

        } else {

        }
    })
    .catch(err => {
        console.log('Error in founduserpage > handleAcceptRequest: ', err);
        return;
    })
}

function handleDeclineRequest() {
    axios.get('/declineRequest', {
        params: {
            userid: this.dataset.thisuserid
        }
    })
    .then(data => {
        if(data.data.type == 'error') {

        } else {
            
        }
    })
    .catch(err => {
        console.log('Error in founduserpage > handleDeclineRequest: ', err);
        return;
    })
}

Array.from(addFriendButtons).forEach(
    addFriendButton => addFriendButton.addEventListener('click', handleAddFriend)
)

Array.from(removeFriendButtons).forEach(
    removeFriendButton => removeFriendButton.addEventListener('click', handleRemoveFriend)
)

Array.from(withdrawRequestButtons).forEach(
    withdrawButton => withdrawButton.addEventListener('click', handleWithdrawRequest)
)

Array.from(acceptFriendButtons).forEach(
    acceptFriendButton => acceptFriendButton.addEventListener('click', handleAcceptRequest)
)

Array.from(declineFriendButtons).forEach(
    declineFriendButton => declineFriendButton.addEventListener('click', handleDeclineRequest)
)

