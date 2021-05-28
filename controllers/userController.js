const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.createUser = (req, res) => {
    let vals = req.body;
    console.log(vals);

    if(vals.email.match(/.+\@.+\..+/)) {
        console.log("wohooo");
    }

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

        if(user) {
            req.flash('error', 'User is already registered, try logging in.');
            return res.redirect('/signin');
        } else {
            let password = vals.password;
            const saltRounds = 10;
            
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if(err) {
                    console.log('Error generating salt: ', err);
                    req.flash('error', 'Error encountered!');
                    return res.redirect('back');
                }

                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) {
                        console.log('Error with hashing password: ', err);
                        req.flash('error', 'Error encountered!');
                        return res.redirect('back');
                    }

                    // console.log('hash: ', hash);
                    vals.password = hash;
                    // console.log(vals);

                    User.create(vals, (error) => {
                        if(error) {
                            console.log("In createUser function (create): ", error);
                            req.flash('error', 'Error encountered!');
                            return res.redirect('back');
                        }
        
                        req.flash('success', 'Thanks for signing up! Please log in to continue.');
                        return res.redirect('/signin');
                    });
                });
            });
            
        } 
    });

};

module.exports.login = (req, res) => {
    req.flash('success', 'Logged In');
    return res.render('home');
}
