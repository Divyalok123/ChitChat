const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const passportLocal = require('../config/passport_local');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        layout: 'signinlayout'
    });
});

router.get('/signin', (req, res) => {
    res.render('signin', {
        layout: 'signinlayout'
    });
});

router.get('/user', passport.checkIfAuthenticated, function(req, res){
    res.render('userhome');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/signin'}), userController.login)
router.get('/logout', function(req, res) {
    req.logOut();
    req.flash('success', 'Logged out successfully');
    return res.redirect('/')
});
router.post('/createuser', userController.createUser);

module.exports = router;