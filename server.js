var express = require('express');
var path = require('path');
var app = express();
var names = require('./data.js');
var bodyParser = require('body-parser');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var mongoose = require('mongoose');

//All of the routes needed server side.
var userRoutes = require('./server/user-routes');
var gameRoutes = require('./server/game-routes');


require('babel-register')({
  presets: [ 'react' ]
});

app.use(bodyParser.urlencoded({ extended: false }));

//All the routes needed for user auth.
app.use('/user', userRoutes);

//All the routes needed for the game.
app.use('/game', gameRoutes);

app.set('view engine', 'ejs');

//The landing page.
app.get('/', function(req,res){

  res.render('home');

});

//The database that connects to an external database
mongoose.connect('mongodb://farhan:farhan@ds145677.mlab.com:45677/eloify_db');

//The pages rendered with React.js
app.get(['/mapgame', '/react-login', '/react-register', '/mapgame2'], function(req,res){

var ReactRouter = require('react-router');
var match = ReactRouter.match;
var routes = require('./client/routes').routes;
var RouterContext = React.createFactory(ReactRouter.RouterContext);

    match({routes: routes, location: req.url}, function(error, redirectLocation, renderProps) {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {

//This is how it would work with redux
        // res.send("<!DOCTYPE html>"+
        //   ReactDOMServer.renderToString(
        //     Provider({store: store}, RouterContext(renderProps))
        //   )
        // );

      res.send("<!DOCTYPE html>"+
          ReactDOMServer.renderToString( RouterContext(renderProps)
          )
        );

        //res.send('React Route MATCHED!!!!');

      } else {
        res.status(404).send('Not found')
      }
    });

});

//The way to deploy javascript on to express applications.
app.use(express.static(path.join(__dirname, 'views')));


//Listen on PORT 3000
app.listen(process.env.PORT || '3000', function(){

  console.log('Listening on PORT 3000');

});
