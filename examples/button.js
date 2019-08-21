var b = require('bonescript');

let button = 'GP0_3'
let ladar = 'GP1_4'
b.pinMode(button, b.INPUT);
b.pinMode(ladar, b.OUTPUT);

b.digitalWrite(ladar, 0);

while(true) {
    let b_read = b.digitalRead(button)
    if (b_read == 1) {
        b.digitalWrite(ladar, 1);
    } else {
        b.digitalWrite(ladar, 0);
    }
}