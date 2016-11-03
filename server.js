var express = require('express');
var path = require('path');
var app = express();
var names = require('./data.js');
var bodyParser = require('body-parser');
var React = require('react');

//All of the routes needed server side.
var userRoutes = require('./server/user-routes');
var gameRoutes = require('./server/game-routes');


app.use(bodyParser.urlencoded({ extended: false }));

//All the routes needed for user auth.
app.use('/user', userRoutes);

//All the routes needed for the game.
app.use('/game', gameRoutes);

app.set('view engine', 'ejs');

app.get('/', function(req,res){

  res.render('index');

});

//The way to deploy javascript on to express applications.
app.use(express.static(path.join(__dirname, 'views')));



//Listen on PORT 3000
app.listen(process.env.PORT || '3000', function(){

  console.log('Listening on PORT 3000');

});
