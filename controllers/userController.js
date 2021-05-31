const User = require('../models/user');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

module.exports.profile = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) {
            console.log('Error in profile controller: ', err);
            return;
        }

        res.render('userprofile', {
            profile_user: user,
            title: 'Profile | ChitChat'
        });
    })
}

module.exports.update = async (req, res) => {
    if(req.params.id == req.user.id) {
        try {
            let user = await User.findById(req.params.id);
            User.multerUpload(req, res, (err) => {
                if(err) {
                    if(err instanceof multer.MulterError)
                        console.log('Multer Error: ', err);
                    else
                        req.flash('error', err);
                    res.redirect('back');
                } else {
                    if(req.file == undefined) {
                        req.flash('error', 'Empty File!');
                        res.redirect('back');
                    } 
                    
                    //delete the previous file
                    if(user.avatar) {
                        let prevavatarpath = path.join(__dirname, '..', user.avatar);
                        
                        if(fs.existsSync(prevavatarpath)) { // check if the path exists
                            fs.unlink(prevavatarpath, (err) => {
                                    if(err) throw err;
                                    console.log('Deleted previous file');
                                }
                            )
                        }
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                    user.save();

                    // console.log('user: ', user);
                    req.flash('success', 'Profile Updated!');
                    res.redirect('back');          
                }
            })
        } catch(err) {
            console.log('Catched err in update controller: ', err);
            req.flash('error', 'Some error occured. Please try again.');
            res.redirect('back');
        }
    } else {
        console.log('Users are not same');
        return res.status(401).send('Unauthorized user');
    }
}

module.exports.logout = (req, res) => {
    req.logOut();
    req.flash('success', 'Logged out successfully');
    return res.redirect('/')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Logged In');
    return res.redirect('/');
}

module.exports.createUser = (req, res) => {
    let vals = req.body;

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

                    vals.password = hash;

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
