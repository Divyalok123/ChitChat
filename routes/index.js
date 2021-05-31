const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const passportLocal = require('../config/passport_local');

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

module.exports = router;