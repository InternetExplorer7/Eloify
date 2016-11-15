//These are the routes that we will use for user's signing up, and all of the caveats.

var express = require('express');
var Router = express.Router();

// // // // // // // // // // // // // // // // // //
//Getting todays date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
}

if(mm<10) {
    mm='0'+mm
}

today = mm+'/'+dd+'/'+yyyy;


// // // // // // // // // // // // // // // // // //
var mongoose = require('mongoose');
var passport = require('passport');
var passportLocal = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var bodyParser = require('body-parser');
var _ = require('lodash');

//Database models.
var User = require('./models/users-db.js');
var Question = require('./models/questions-db.js');


// Routes seperated in Other files.
var quizRoutes = require('./quiz-routes')(Router);



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


//login page.
Router.get('/login', function(req,res){

    //If user is logged in, log them out.
      if (!(req.user === 'undefined')){
        req.logout();
    };

    res.render('auth/login');
});

// When login is posted.
Router.post('/login', passport.authenticate('local', {
    successRedirect : '/user/me',
    failureRedirect : '/user/login'
}), function(req,res){

  //You really don't do much over here.

});

//register page
Router.get('/register', function(req,res){

  //If user is logged in, log them out.
    if (!(req.user === 'undefined')){
      req.logout();
    };

  res.render('auth/register');
});

// When register is posted.
Router.post('/register', function(req,res){


//Get the username and password from the forms.
  var postUsername = req.body.username;
  var postPassword = req.body.password;


    User.register(new User({
      username : postUsername,
      score : 0
    }),postPassword, function(err,body){
        if(err){
            console.log(err);
        }else{
            passport.authenticate('local')(req,res,function(){
                res.redirect('/user/me');
            });
        }
    });
});

//Profile Route.
Router.get('/me', authenticationMiddleware(), function(req,res){

  var username = req.user.username;
  var score = req.user.score;

  res.render('user/personal', {
    username : username,
    score : score
  });

});

//The route that logs you out.
Router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});

var myUserId;


//Rendering a simple quiz game.
Router.get('/q/random', authenticationMiddleware(), function(req,res){

  var UserId = req.user._id;
  myUserId = req.user._id;

  res.render('quiz/simple-math');

});


//This is where the score gets changed.
Router.post('/q/random', authenticationMiddleware(), function(req,res){

var questions = [req.body.q1, req.body.q2, req.body.q3]
var answers = ['d', 'd', 'a'];

if(questions[0] == 'd' && questions[1] == 'd' && questions[2] == 'a'){

  console.log('Correct');
  addScore();


}else{

  console.log('Wrong');
  minusScore();

}

// if(questions[1] == 'd'){
//   console.log('Correct');
//   addScore();
// }else{
//   console.log('Wrong');
//   minusScore();
// }
//
// if(questions[2] == 'a'){
//
//   console.log('Correct');
//   addScore();
//
// }else{
//   console.log('Wrong');
//   minusScore();
// }

  res.render('quiz/simple-answers', {
    questions : questions,
    answers : answers
  });

});



//Viewing Questions that users created.
Router.get('/viewQs', function(req,res){


///////////////////////////////////////////////////////////////
// TODO: Find a way to filter questions that were already answered.

var answeredQuestions = [];
var username;

try {

var thisUser = req.user;

} catch (e) {

console.log('Error!!');

} finally {

//If the user is logged in.
if(thisUser != undefined){

myQuestions = thisUser.answeredQs
username = thisUser.username;

myQuestions.forEach(function(question){

answeredQuestions.push(question.id);

})

//If the user is not logged in.
}else{

  answeredQuestions.push('none');
  username = 'unavailable';
}


}
///////////////////////////////////////////////////////////////////

  Question.find({}, function(err,body){
    if(err){
      console.log(err)
    }else{

    res.render('quiz/viewQs/test', {
      questions : body,
      answeredQuestions : answeredQuestions,
       _ : _,
      username : username
    });

    }
  });

});

//Creating questions that users can score by.
Router.get('/createQs', authenticationMiddleware(), function(req,res){

  var username = req.user.username;
  res.render('quiz/createQs/test', {
    username : username
  });
});

//The place where you submit questions.
Router.post('/submitQs', authenticationMiddleware(), function(req,res){

//Topics for the question being asked.
var topics = req.body.topics;


//This is the main question that is getting asked.
var mainQuestion = req.body.question;

// These are the answers to the questions.
  var questionA = req.body.qA;
  var questionB = req.body.qB;
  var questionC = req.body.qC;
  var questionD = req.body.qD;

// All of the answers in an array.
var allQuestions = [questionA, questionB, questionC, questionD];

// Correct choice to the questions.
var correctChoice = req.body.choice;

//Here is the user to save.
var userCreator = req.user.username;

var newQuestion = new Question({
  date : today,
  username : userCreator,
  question : mainQuestion,
  choices : {
    a : questionA,
    b : questionB,
    c : questionC,
    d : questionD
  },
  correctAnswer : correctChoice,
  likes : 0,
  dislikes : 0
});


//TEMPORARY
//Pushing the topics to the database;
if(topics == undefined){
  console.log('Topics are undefined');

}else{

  topics.forEach((eachTopic) => {

    newQuestion.topics.push(eachTopic);
});

}

if(topics.length > '1'){
  console.log('More than 1 topic!!!')
}



            // TODO: This is where topics will be saved with a link tag as well!!!!
// var fullTopics = [];
//
// var topicObject;
//
// //Topics that are being taken from the server.
// if(topics == undefined){
//   console.log('Topics are undefined');
// }else{
//
//   topics.forEach((eachTopic) => {
//
//   if(eachTopic == 'Some Title'){
//
//     topicObject = {
//       name : eachTopic,
//       url : '/test'
//     }
//
//   fullTopics.push(topicObject);
//
//   }
//
//
//
//
//
//     newQuestion.topics.push(eachTopic);
// });
//
//
// }


newQuestion.save((err,body) => {
  if(err){
    console.log(err);
  }else{
    console.log('SAVED');
  }
});

  res.redirect('/user/submitted');
});

//The page after a user submits a question.
Router.get('/submitted', function(req,res){

  res.render('quiz/createQs/submit');

});

//A way to update the users public profile.
Router.get('/public/:user', authenticationMiddleware(), function(req,res){
  var userSearched = req.params.user;

  User.find({ username : userSearched}, function(err,body){
    if(err){
      console.log(err);
      res.send('ERROR');
    }else{

      //See if there is a username with a try statement.
      try {
        var userName = body[0].username;
        var userScore = body[0].score;
      } catch (e) {
        //userName = 'Invalid Bullshit';
        res.render('user/cannotfind');
      } finally {
        // Code that goes if success.
      }

      //If no error, we render your public profile.
      res.render('user/public-profile',{
        userName : userName,
        userScore : userScore
        });
      }
    })

  });

//Add ELO score to db.
function addScore(){

//Find the score in the DB.
User.findById(myUserId,function(err,body){
  if(err){
    console.log(err);
  }else{

  var userScore = Number(body.score);

   body.score = Number(body.score) + 50;

   body.save(function(err,num){
     if(err){
       console.log(err);
     }else{
        console.log('Score Updated');
      }
     });
   }
  });

};

//Subtract ELO score from db.
function minusScore(){


  //Find the score in the DB.
  User.findById(myUserId,function(err,body){
    if(err){
      console.log(err);
    }else{

    var userScore = Number(body.score);

    body.score = Number(body.score) - 50;

     body.save(function(err,num){
       if(err){
         console.log(err);
       }else{
          console.log('Score Updated');
        }
       });
     }
    });

}


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


module.exports = Router;

//======================================
// Router.get('/', function(req,res){
//
//   //If user is logged in, log them out.
//     if (!(req.user === 'undefined')){
//       req.logout();
//   };
//   res.render('index');
// });
//
// Router.post('/', passport.authenticate('local', {
//     successRedirect : '/secret',
//     failureRedirect : '/'
// }),function(req,res){
//       //You don't really do much here.
// });
//
//
// var user_name;
// var user_id;
//
//
// Router.get('/secret', authenticationMiddleware(), function(req,res){
//
//      user_name = req.user.username;
//      user_id = req.user._id
//
//   var customFood = req.user.food;
//
// if(customFood == undefined){
//   customFood = 'Fuck'
// }
//
//     res.render('secret', {user : user_name, food : customFood});
//
// });
//
// Router.get('/food', authenticationMiddleware(), function(req,res){
//
//  var myfood = req.query.food;
//
//  User.findByIdAndUpdate(user_id, {food : myfood}, function(err,usr){
//    if(err){
//      console.log(err);
//    }else{
//      console.log(usr);
//    }
//  });
//
//   res.redirect('/secret');
//
// });
//
// Router.get('/deletekey', function(req,res){
//
//   User.findByIdAndUpdate(user_id, {food : ''}, function(err,usr){
//     if(err){
//       console.log(err);
//     }else{
//       console.log(usr);
//     }
//   });
//
// res.redirect('/secret');
//
// });
//
// Router.get('/register', function(req,res){
//
// //If user is logged in, log them out.
//   if (!(req.user === 'undefined')){
//     req.logout();
// };
//     res.render('register');
//
// });
//
// Router.post('/register', function(req,res){
//
//     User.register(new User({username : req.body.username}),req.body.password, function(err,body){
//         if(err){
//             console.log(err);
//         }else{
//             passport.authenticate('local')(req,res,function(){
//                 res.redirect('/');
//             });
//         }
//     });
// });
//
// Router.get('/logout', function(req,res){
//     req.logout();
//     res.redirect('/');
// });
