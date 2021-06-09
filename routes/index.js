const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const passportLocal = require('../config/passport_local');
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('home', {
        title: 'ChitChat'
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        title: 'SignUp | ChitChat'
    });
});

router.get('/signin', (req, res) => {
    res.render('signin', {
        title: 'Sign In | ChitChat'
    });
});

router.get('/profile/:id', passport.checkIfAuthenticated, userController.profile);
router.post('/update/:id', passport.checkIfAuthenticated, userController.update);
router.post('/login', passport.authenticate('local', {failureRedirect: '/signin'}), userController.login)
router.get('/logout', userController.logout); 
router.post('/createuser', userController.createUser);

router.get('/chatroom/:id', passport.checkIfAuthenticated, async (req, res) => {
    let allusers = await User.find({});
    
    res.render('chatroom', {
        title: 'Chatroom | Chitchat',
        users: allusers
    });
})

//getting the user details for chatbox-user-change (in chatroom.js)
router.get('/userdetails', async (req, res) => {
    let thisuser = await User.findOne({_id: req.query.userid});
    res.status(200).json(thisuser);
})

module.exports = router;