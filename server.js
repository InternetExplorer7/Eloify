var express = require('express');
var path = require('path');
var app = express();
var names = require('./data.js');


app.set('view engine', 'ejs');

app.get('/', function(req,res){

res.render('index');

});


app.get('/game-test', function(req,res){
    res.send('This is where the game test would go.');
});


//The way to deploy javascript on to express applications.
app.use(express.static(path.join(__dirname, 'views')));



//Listen on PORT 3000
app.listen(process.env.PORT || '3000', function(){
  console.log('Listening on PORT 3000');
});
