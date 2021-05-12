const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('main');
});

router.get('/home', function(req, res) {
    res.render('home', {
        layout: 'homelayout'
    });
});

module.exports = router;