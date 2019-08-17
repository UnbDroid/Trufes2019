var b = require('bonescript');


class Robot {
    
    constructor() {
        this.button = 'GP0_3'
        b.pinMode(this.button, b.INPUT);

    }
    
    start_program(){

    }
    
    
}

let b_read = b.digitalRead(button)
if (b_read == 1) {
    b.digitalWrite(ladar, 1);
} else {
    b.digitalWrite(ladar, 0);
}