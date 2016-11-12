//This is the place we configure the database to add new questions.

var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
  date : String,
  username : String,
  question : String,
  choices : {
    a : String,
    b : String,
    c : String,
    d : String
  },
  correctAnswer : String,
  likes : Number,
  dislikes : Number,
  topics : []
});

var Question = mongoose.model('Questions', questionSchema);

module.exports = Question;
