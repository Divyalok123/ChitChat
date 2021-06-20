module.exports.home = (req, res) => {
    res.render('home', {
        title: 'ChitChat'
    });
}

module.exports.signupPage = (req, res) => {
    res.render('signup', {
        title: 'SignUp | ChitChat'
    });
}

module.exports.signinPage = (req, res) => {
    res.render('signin', {
        title: 'Sign In | ChitChat'
    });
}