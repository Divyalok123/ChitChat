const express = require('express');
const port = 2021;
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const { urlencoded } = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const middlewares = require('./config/middlewares');

//static files
app.use(express.static(__dirname + '/assets'));

// express-session
app.use(session({
    name: 'Registration',
    secret: '%GnMIW95zfPXjzyDGyHB',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 100000 //the expiry time of the cookie
    }

}));

//to extract scripts && styles && view engine
app.use(expressLayouts); 
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout', 'homelayout');
app.set('layout signin', false);

//body-parser
app.use(express.urlencoded({extended: false}));

// flash
app.use(flash());
app.use(middlewares.flashMiddleWare);

app.use('/', require('./routes/index'));
app.listen(port, (err) => {
    if(err)
        console.log(`Error encountered: ${err}`);
    else
        console.log(`Server is running at port: ${port}`);
});