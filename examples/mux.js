var rc = require('roboticscape');
var b = require('bonescript');

// b.digitalWrite(17, 1);
// b.digitalWrite(109, 1);
// b.digitalWrite(103, 1);

setInterval(saida, 100);

function saida(){
    let ldr = rc.adc(0);
    ldr = 1/ldr;
    ldr *= 555.555;
    console.log(ldr);
    // b.digitalRead(17);
    // b.digitalRead(109);
    // b.digitalRead(103);
}



