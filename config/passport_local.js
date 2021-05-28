const passport = require("passport");
const localStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const User = require("../models/user");

passport.use(
	new localStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		function (req, username, password, done) {
			User.findOne({ email: username })
				.then((user) => {
					if (!user || user == null) {
						req.flash('error', "User is not registered. Please sign-up.");
						done(null, false);
					}

                    console.log('in passport: ', user);

					//check password
                    bcrypt.compare(password, user.password, (err, same) => {
                        if(err) {
                            req.flash('error', 'Some error occured!');
                            done(null, false);
                        }

                        if(same) {
                            done(null, user);
                        } else {
                            req.flash('error', 'Invalid Password');
                            done(null, false);
                        }
                    });
				})
				.catch((err) => {
					console.log("Some error occured while finding user in passport authentication.");
					done(err);
				});
		},
	),
);


passport.serializeUser(function(user, done){
    done(null, user.id);
})

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user) {
        if(err) {
            console.log('Error occured while deserializing: ', err);
            done(err);
        }

        done(null, user);
    })
}) 

passport.checkIfAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

passport.setUserIfAuthenticated = (req, res, next) => {
    // console.log("in setuesrifauthenticated middleware");
    if(req.isAuthenticated()) {
        // console.log('from setuserifauthenticated: ', req.user);
        res.locals.user = req.user;
    }

    next();
}


module.exports = passport;