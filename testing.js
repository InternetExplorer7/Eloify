// var _ = require('lodash');
//
//
// var arrayOfIds = ['224234fsd3323r', '342434324', 'abc'];
//
// var checkArray = _.includes(arrayOfIds, 'abc');
//
// //console.log(checkArray)
//
//
// // I could have it where, when I answer a question, it gets saved into the array for the user, called answered questions.
//
// //Logic,
//
// /*
// Logic..
//
// Checks if the id of the question is matches the one in the array. And if it does, it only adds 1 point, and says that the question has been anwered before.
//
//
// */
//
//
//
// var a = {
//   c : 'Hello'
// };
//
// var stringLetter = 'c';
//
// //console.log(a[stringLetter]);
//
//
// var today = new Date();
// var dd = today.getDate();
// var mm = today.getMonth()+1; //January is 0!
// var yyyy = today.getFullYear();
//
// if(dd<10) {
//     dd='0'+dd
// }
//
// if(mm<10) {
//     mm='0'+mm
// }
//
// today = mm+'/'+dd+'/'+yyyy;
//
//
//
//
// var names = ['a', 'b', 'c'];
// var fullNames = [];
// var namesObject;
//
// names.forEach(function(name){
//
// if(name == 'a'){
//    namesObject = {
//     name : name,
//     url : '/a'
//   }
//
//   fullNames.push(namesObject)
//
// }else if(name == 'b'){
//
//   namesObject = {
//    name : name,
//    url : '/b'
//  }
//
//  fullNames.push(namesObject)
//
// }else if(name == 'c'){
//
//   namesObject = {
//    name : name,
//    url : '/c'
//  }
//
//  fullNames.push(namesObject)
//
//
// }
//
//
//
//
// });
//
//
// var testing2 = [
//   {
//     name : 'US',
//     url : '/us-history'
//   },
//   {
//
//   }
//
// ]
//
// var urls = [];
//
// if(testing[0] == 'a'){
//   urls.push('/a');
// }
//
// if(testing[0] == 'b'){
//   urls.push('/b');
// }
//
// if(testing[0] == 'c'){
//   urls.push('/c');
// }
//
//
//
// var test90 = {
//   names : []
// }
//
// var newNames = '3234234';
//
//
//


var _ = require('lodash');



var questions = [

  {
    _id : {
        $oid : "58291284d6cb477289d73ea8"
    }
  },

  {
    _id : {
        $oid : "58291284d6cb477289d74ea8"
    }
  },

  {
    _id : {
        $oid : "58291284d6cb477289d75ea8"
    }
  },

  {
    _id : {
        $oid : "58291284d6cb477289d76ea8"
    }
  }

];


var answeredQs = [
       {
           status: "correct",
           id: "58291284d6cb477289d73ea8"
       },
       {
         status: "correct",
         id: "58291284d6cb477289d74ea8"
       },
       {
         status: "correct",
         id: "58291284d6cb477289d75ea8"
       },
       {
         status: "correct",
         id: "58291284d6cb477289d76ea8"
       },
       {
         status: "correct",
         id: "58291284d6cb477289d77ea8"
       },
       {
         status: "correct",
         id: "58291284d6cb477289d78ea8"
       },
       {
         status: "correct",
         id: "58291284d6cb477289d79ea8"
       }
  ];

// TODO: Check if answeredQs id matches

// answeredQs.forEach(function(answered){
//
//   console.log(answered)
//
// });

// var a = [1,2,3,4,5]
//
// console.log(_.includes(a, [1,2,3,5])); // returns true
//
//
//
// var arrayys;
//
// arrayys.push(12)
//
// console.log(arrayys)

var uniqueRandomArray = require('unique-random-array');

var testQs = [{a : 'hi'}, { a : 'bye'}, { a : 'haah'}, { a : 'fuckyou'}];

var rand = uniqueRandomArray(testQs);

// console.log(rand().a);

var elo = require('elo-rank')(15);



var playerA = 0;
var playerB = 0;


//Gets expected score for first parameter
var expectedScoreA = elo.getExpected(playerA, playerB);
var expectedScoreB = elo.getExpected(playerB, playerA);


playerA = elo.updateRating(expectedScoreA, 1, playerA);

console.log(playerA)
console.log(playerB)









///
