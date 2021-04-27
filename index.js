const express = require('express');
const port = 2021;
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('main');
});

app.listen(port, function(err){
    if(err) {
        console.log(`Error encountered: ${err}`);
    }
});