var express = require('express');
var Router = express.Router();


Router.get('/', function(req,res){

  res.send('This is where the game will go.');

});

Router.get('/win', function(req,res){

  res.send('What gets sent after you have won.');

});

module.exports = Router;
