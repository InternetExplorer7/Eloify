var express = require('express');
var path = require('path');
var app = express();
var names = require('./data.js');
var bodyParser = require('body-parser');


var myCountry;

app.use(bodyParser.urlencoded({ extended: false }));


app.set('view engine', 'ejs');

app.get('/', function(req,res){

res.render('index');

});


app.get('/game-test', function(req,res){

if(myCountry == undefined){
  myCountry = '';
}else{
  myCountry = myCountry + '? hahahahah, fuck ' + myCountry;
}

  res.render('game-test',{myCountry : myCountry});

});



app.post('/game-response', function(req,res){

  myCountry = req.body.country;

res.redirect('/game-test');

});

//The way to deploy javascript on to express applications.
app.use(express.static(path.join(__dirname, 'views')));



//Listen on PORT 3000
app.listen(process.env.PORT || '3000', function(){
  console.log('Listening on PORT 3000');
});
