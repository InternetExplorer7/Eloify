var express = require('express');
var path = require('path');
var app = express();
var names = require('./data.js');
var bodyParser = require('body-parser');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var uniqueRandomArray = require('unique-random-array');
var LazyArray = require('lazyarray');

//All of the routes needed server side.
var userRoutes = require('./server/user-routes');
var gameRoutes = require('./server/game-routes');

//The Databases
var User = require('./server/models/users-db.js');
var Questions = require('./server/models/questions-db.js');

require('babel-register')({
  presets: [ 'react' ]
});

app.use(bodyParser.urlencoded({ extended: false }));

//All the routes needed for user auth.
app.use('/user', userRoutes);

//All the routes needed for the game.
app.use('/game', gameRoutes);
app.set('view engine', 'ejs');

// // // // // // // // // // // // // // // // // //
      // --- Finding the Rank for all Users --- //

var sortedRank = [];

User.find().then((body) => { // mpromise is deprecated, use bluebird instead maybe..
  if (body.length < 1) {
    console.log(body);
  } else {
    var sortedArray = new LazyArray(body);
    sortedArray.sort('score', 'ascending');
    Object.keys(sortedArray).forEach((key) => {
      sortedRank.push(sortedArray[key]);
    })
  }
})

// User.find({}, (err,body) => {

//   if(err){
//     console.log(err);
//   } else {
//       var sortedArray = new LazyArray(body);
//       sortedArray.sort("score", "ascending");
//       Object.keys(sortedArray).forEach((key) => {
//           sortedRank.push(sortedArray[key]);
//       });
//     }
// });
// // // // // // // // // // // // // // // // // //

//The landing page.
app.get('/', (req,res) => {

  Questions.find().then((body) => {
    if (body.length < 1) {
      console.log(body);
      const randomQuestion = 'ERROR';
      res.render('home', { randomQuestion: randomQuestion });
    } else {
      var rand = uniqueRandomArray(body);
      var randomQuestion = rand();
      res.render('home', { randomQuestion: rand() });
    }
  })

//   Questions.find({}, function(err,body){

// //Error in finding questions.
//     if(err){
//       console.log(err)
//     var randomQuestion = 'ERROR';

//       res.render('home', { randomQuestion : randomQuestion });
// //All questions are found.
//     }else{
//       //Randomize the questions.
//     var rand = uniqueRandomArray(body)
//       //Random questions to check.
//   var randomQuestion = rand();

//   res.render('home', { randomQuestion : rand() });

//     }
//   });

  if(req.isAuthenticated()){


  }
  //console.log(req.user);



});

//The way you find a user.
app.get('/:user', (req,res) => {

  var userSearched = req.params.user;

      // Querying the database and getting the names //
// // // // // // // // // // // // // // // // // // // // //
  User.find({ username: userSearched }).then((body) => {
    if (body.length < 1) {
      console.log(body);
      console.log('HAHAHAH');
    } else {
      try {
        const userName = body[0].username;
        const userScore = body[0].score;
        const answeredIds = body[0].answeredQs;
      } catch (e) {
        // Redirect to some `cannotfind` page.
      } finally {
        // success? :-)
      }

      if (userName === undefined) {
        res.render('user/cannotfind');
      } else {
        var questions = {
          questionsID: [],
          correct: 0,
          wrong: 0
        };
        var questionsSaved = [];
        answeredIds.forEach((qs) => {
          switch (sq.status) {
            case 'correct': 
              questions.correct += 1;
              break;
            case 'wrong':
              questions.wrong += 1;
              break;
          }
          const questionId = qs.id;
          questions.questionsID.push(questionId);
        }); //answerIds forEach

        Questions.find({ _id: { $in: questions.questionsID }}).then((markets) => {
          if (markets.length < 1) {
            console.log(markets);
          } else {
            // Do nothing here.
          }
          //If no error, we render your public profile.
          res.render('user/public-profile', {
            userName : userName,
            userScore : userScore,
            answeredQuestions : markets,
            answeredCorrect : questions.correct,
            answeredWrong : questions.wrong
          }); // res.render
        }) // Questions promise
      } // else (child)
    } // else (parent)
  }) // Promise (.then)

// User.find({ username : userSearched}, function(err,body){
//     if(err){
//       console.log(err);
//       console.log('HAHAHAH');
//     }else{

//       //See if there is a username with a try statement.
//       try {
//       var userName = body[0].username;
//       var userScore = body[0].score;
//       var answeredIds = body[0].answeredQs;


//       } catch (e) {
//         //userName = 'Invalid Bullshit';
//       //  res.render('user/cannotfind');
//       } finally {
//         // Code that goes if success.
//       }

// if(userName == undefined){

//  res.render('user/cannotfind');

// }else {


//   var questions = {
//     questionsID : [],
//     correct : 0,
//     wrong : 0
//   };

//   var questionsSaved = [];


// answeredIds.forEach(function(qs){


// if(qs.status == 'correct'){
//   questions.correct += 1
// }

// if(qs.status == 'wrong'){
//   questions.wrong += 1
// }

// var questionId = qs.id;

// questions.questionsID.push(questionId);


// })


//     //Find the matching questions.
// Questions.find({ _id: { $in: questions.questionsID }}, function (err, markets) {


// if(err){
//   console.log(err)
// }else{
//   //Do nothing here.
// }


// //If no error, we render your public profile.
//     res.render('user/public-profile',{
//         userName : userName,
//         userScore : userScore,
//         answeredQuestions : markets,
//         answeredCorrect : questions.correct,
//         answeredWrong : questions.wrong
//       });


// })



//     }

//   }
// })
// // // // // // // // // // // // // // // // // // // // //

});


//The database that connects to an external database
mongoose.connect('mongodb://farhan:farhan@ds145677.mlab.com:45677/eloify_db');

//The pages rendered with React.js
app.get(['/mapgame', '/react-login', '/react-register', '/mapgame2'], (req, res) => {

    var ReactRouter = require('react-router');
    var match = ReactRouter.match;
    var routes = require('./client/routes').routes;
    var RouterContext = React.createFactory(ReactRouter.RouterContext);

    match({
        routes: routes,
        location: req.url
    }, (error, redirectLocation, renderProps) => {
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

            res.send("<!DOCTYPE html>" +
                ReactDOMServer.renderToString(RouterContext(renderProps))
            );

            //res.send('React Route MATCHED!!!!');

        } else {
            res.status(404).send('Not found')
        }
    });

});

//The way to deploy javascript on to express applications.
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));


//Listen on PORT 3000
app.listen(process.env.PORT || '3000', function(){
  console.log('Listening on PORT 3000');
});
