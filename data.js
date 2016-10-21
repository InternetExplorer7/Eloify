var random = require('random-name')

var a = [];

for(var i = 0; i < 10; i++){
    a.push(random());
}

var c = random();

module.exports = a;
