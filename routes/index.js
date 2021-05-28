const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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

router.post('/home', userController.login);
router.post('/createuser', userController.createUser);

module.exports = router;