//These are the routes that we will use for user's signing up, and all of the caveats.

var express = require('express');
var Router = express.Router();

// // // // // // // // // // // // // // // // // //

Router.get('/login', function(req,res){

  res.send('This is the login page.');

});

Router.get('/register', function(req,res){

  res.send('This is the regsitering page.');

});


// // // // // // // // // // // // // // // // // //
// var mongoose = require('mongoose');
// var passport = require('passport');
// var passportLocal = require('passport-local');
// var passportLocalMongoose = require('passport-local-mongoose');
// var bodyParser = require('body-parser');
//
//
// var User = require('./db.js');
//
// //======================================
// // --- Middleware so we can use sessions.
// Router.use(require('express-session')({
//     secret : 'This can be anything',
//     resave : false,
//     saveUninitialized : false
// }));
// //======================================
//
//     passport.serializeUser(User.serializeUser());
//     passport.deserializeUser(User.deserializeUser());
//     passport.use(new passportLocal(User.authenticate()));
// //======================================
// // --- Middleware so we can use passport
// Router.use(passport.initialize());
// Router.use(passport.session());
// //======================================



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


//Middleware for authentication.
function authenticationMiddleware(){
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }else{
      res.redirect('/')
    }
  };
};



module.exports = Router;
