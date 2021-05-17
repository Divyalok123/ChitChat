const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.createUser = (req, res) => {
    let vals = req.body;

    console.log(vals);

    if(vals.password != vals.confirm_pass) {
        req.flash('error', 'Password don\'t match. Please try again.');
        return res.redirect('back');
    }

};
