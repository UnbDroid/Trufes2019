var b = require('bonescript');
var math = require('mathjs');

var s0 = 'P9_39'
var s1 = 'P9_28' //A
var s2 = 'P9_41' //B
var s3 = 'P9_23' //C

// frente esquerda = 101
// frente direita = 111
// tras esquerda = 001
// tras direita = 011

let FE = 1350;
let FD = 1650;
let TD = 1450;
let TE = 1650;

let ldr = 0;

b.pinMode(s1, b.OUTPUT);
b.pinMode(s2, b.OUTPUT);
b.pinMode(s3, b.OUTPUT);

b.digitalWrite(s1, 0);
b.digitalWrite(s2, 1);
b.digitalWrite(s3, 1);

setInterval(copyInputToOutput, 500);
 
function copyInputToOutput() {
    ldr = b.analogRead(s0);
    ldr = 1000/ldr;
    ldr = math.round(ldr);
    console.log(ldr);
    
}