var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var bodyParser = require('body-parser');

//DB Models
var User = require('./models/users-db');
var Questions = require('./models/questions-db');

// These are all of the routes for the questions for every


module.exports = function(Router) {


  //======================================
  // --- Middleware so we can use sessions.
  Router.use(require('express-session')({
      secret : 'This can be anything',
      resave : false,
      saveUninitialized : false
  }));
  //======================================

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use(new passportLocal(User.authenticate()));

  //======================================
  // --- Middleware so we can use passport
  Router.use(passport.initialize());
  Router.use(passport.session());
  //======================================

//Route SUBTITLES
/*
2)/questions/math/simple
3)/questions/math/hard
4)/questions/history/us
5)/questions/history/global
6)/questions/language/en
7)/questions/language/es
8)/questions/lit/philosophy
9)/questions/lit/non-fic
10)/questions/science/chemistry
11)/questions/science/physics
12)/questions/computers/software
13)/questions/computers/ai
14)/questions/computers/programming
15)/questions/computers/languages

// ROUTE MAIN
16)/questions/math
17)/questions/history
18)/questions/language
19)/questions/lit
20)/questions/science
21)/questions/computers
22)/questions/random
*/

var subRoutes = ['/questions/math/simple', '/questions/math/hard', '/questions/history/us', '/questions/history/global', '/questions/language/en','/questions/language/es', '/questions/lit/philosophy', '/questions/lit/non-fic', '/questions/science/chemistry', '/questions/science/physics','/questions/computers/software', '/questions/computers/ai', '/questions/computers/programming', '/questions/computers/languages'];


subRoutes.forEach(function(myRoute){

  Router.get(myRoute, function(req,res){

//Sending different html files for different routes.
if(myRoute == '/questions/math/simple'){
  res.send('MATH BITCHES');
}else{
    res.send('ROUTE WORKING');
}


  });

});


//Answering the quiz question.
Router.post('/qs/:id', authenticationMiddleware(), function(req,res){

var QuestionId = req.params.id;

var answerSelected = req.body.q1;



Questions.findById(QuestionId, (err,body) => {
  if(err){
    console.log(err);
  }else{

//Questions ID
var idQuestion = body._id;

//Correct Answer.
var correctAnswer = body.correctAnswer;

//Correct Choice
var correctChoice = body.choices[correctAnswer];

      // -- Correct Answer Chosen -//
if(answerSelected == correctAnswer){


User.find({username : req.user.username}, function(err,player){
  if(err){
    console.log(err);
  }else{

var userScore = Number(req.user.score);

//Stats of the question that got answered.
  var questionStats = {
    status : 'correct',
    id : QuestionId
  }

  player[0].score = userScore += 50;
  player[0].answeredQs.push(questionStats);

  player[0].save(function(err,saved){
    if(err){
      console.log(err)
    }else{
      res.redirect('/user/me');
    }
  })

  }
})


    // -- Wrong Answer Chosen -//
}else{

  User.find({username : req.user.username}, function(err,player){
    if(err){
      console.log(err);
    }else{

  var userScore = Number(req.user.score);

//Stats of the question that got answered.
  var questionStats = {
    status : 'wrong',
    id : QuestionId
  }


  player[0].score = userScore -= 50;
  player[0].answeredQs.push(questionStats);



  player[0].save(function(err,saved){
    if(err){
      console.log(err)
    }else{
      res.redirect('/user/me');
    }
  })

    }
  })
      }
    }
});

  //res.send('POSTED!!!');

});



  //Middleware for authentication.
  function authenticationMiddleware(){
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }else{
        res.redirect('/user/login')
      }
    };
  };



};
