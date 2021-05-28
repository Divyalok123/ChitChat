const express = require('express');
const port = 2021;
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const { urlencoded } = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const middlewares = require('./config/middlewares');
const favicon = require('serve-favicon');
const path = require('path');
const MongoStore = require('connect-mongo');

//static files
app.use(express.static(__dirname + '/assets'));

// serving the favicon
app.use(favicon(path.join(__dirname,'assets', 'img', 'favicon.ico')));

// express-session
app.use(session({
    name: 'Registration',
    secret: '%GnMIW95zfPXjzyDGyHB',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000 //the expiry time of the cookie
    },
    store: MongoStore.create({ // mongostore for storing sessions in database
        mongoUrl: 'mongodb://localhost:27017/practice_db_1'
    }, (err) => console.log('Error in mongoStore: ', err))

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