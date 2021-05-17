const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.render('signup', {
        layout: 'signinlayout'
    });
});

router.post('/createuser', userController.createUser);
module.exports = router;