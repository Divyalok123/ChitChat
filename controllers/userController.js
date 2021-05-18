const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.createUser = (req, res) => {
    let vals = req.body;

    console.log(vals);

    if(vals.password != vals.confirm_pass) {
        req.flash('error', 'Password don\'t match. Please try again.');
        return res.redirect('back');
    }

    User.findOne({email: vals.email}, (error, user) => {
        if(error) {
            console.log("In createUser function (findOne): ", error);
            req.flash('error', 'Error encountered!');
            return res.redirect('back');
        }

        if(!user) {
            User.create(vals, (error) => {
                if(error) {
                    console.log("In createUser function (create): ", error);
                    req.flash('error', 'Error encountered!');
                    return res.redirect('back');
                }

                req.flash('success', 'Thanks for signing up! Please log in to continue.');
                return res.redirect('/signin');
            });
        } else {
            req.flash('error', 'User is already registered, try logging in.');
            return res.redirect('/signin');
        }
    });

};
