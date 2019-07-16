var b = require('bonescript');

let pin = 'P9_23'
// b.pinMode('P9_23', b.INPUT);
 
setInterval(copyInputToOutput, 100);
 
function copyInputToOutput() {
    let ldr = b.analogRead('P9_23');
    console.log(ldr)
    
}