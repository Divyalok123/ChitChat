const express = require('express');
const port = 2021;
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

//static files
app.use(express.static(__dirname + '/assets'));

//to extract scripts && styles 
app.use(expressLayouts);
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout home', false);

//setting the view engine
app.set('view engine', 'ejs');

app.use('/', require('./routes/index'));


app.listen(port, function(err){
    if(err) {
        console.log(`Error encountered: ${err}`);
    } else {
        console.log(`Server is running at port: ${port}`);
    }
});