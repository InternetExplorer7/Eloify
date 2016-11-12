var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Creating the user model for Auth.=================
var UserSchema = new mongoose.Schema({
    user : String,
    password : String,
    score : String,
    answeredQs : []
});

//Plugin Passport Local Mongoose to Mongoose Schema.
UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('Users', UserSchema);


module.exports = User;
