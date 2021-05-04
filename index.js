const express = require('express');
const port = 2021;
const app = express();

const db = require('./config/mongoose');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
    res.render('main');
});

app.listen(port, function(err){
    if(err) {
        console.log(`Error encountered: ${err}`);
    }
});