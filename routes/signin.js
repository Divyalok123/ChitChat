const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', (req, res) => {
    res.render('signin', {
        layout: 'signinlayout'
    });
});

module.exports = router;