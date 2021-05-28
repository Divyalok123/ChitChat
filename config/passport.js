const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done){
        
    }
));
