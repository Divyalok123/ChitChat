const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.use('/signup', require('../routes/signup.js'));
router.use('/signin', require('../routes/signin.js'));
module.exports = router;