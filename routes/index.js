const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const passportLocal = require('../config/passport_local');
const User = require('../models/user');
const friendsController = require('../controllers/friendsController');
const searchController = require('../controllers/searchController');
const homeController = require('../controllers/homeController');
const chatroomController = require('../controllers/chatroomController');

//home routes
router.get('/', homeController.home);
router.get('/signup', homeController.signupPage);
router.get('/signin', homeController.signinPage);

//user routes
router.get('/profile/:id', passport.checkIfAuthenticated, userController.profile);
router.post('/update/:id', passport.checkIfAuthenticated, userController.update);
router.post('/login', passport.authenticate('local', {failureRedirect: '/signin'}), userController.login)
router.get('/logout', userController.logout); 
router.post('/createuser', userController.createUser);

router.get('/chatroom/:id', passport.checkIfAuthenticated, chatroomController.getUsers)

//getting the user details for chatbox-user-change (in chatroom.js)
router.get('/userdetails', passport.checkIfAuthenticated, chatroomController.getDetails);

// user search
router.get('/search', passport.checkIfAuthenticated, searchController.search);

// friend request section
router.post('/addfriend', passport.checkIfAuthenticated, friendsController.addfriend);
router.get('/removefriend', passport.checkIfAuthenticated, friendsController.removeFriend);
router.get('/withdrawrequest', passport.checkIfAuthenticated, friendsController.withdrawRequest);
router.get('/acceptRequest', passport.checkIfAuthenticated, friendsController.acceptRequest);
router.get('/declineRequest', passport.checkIfAuthenticated, friendsController.declineRequest);

//friends page
router.get('/friends', passport.checkIfAuthenticated, friendsController.sendFriends);

module.exports = router;