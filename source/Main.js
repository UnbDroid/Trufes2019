var b = require('bonescript');
let Navegar = require('./Navegar');
let N = new Navegar();


class Robot {
    
    constructor() {
        this.button = 'GP0_3'
        b.pinMode(this.button, b.INPUT);

    }
    
    start_program(){
        console.log("Esperando iniciar");
        while(true){
            this.liga = b.digitalRead(this.button);
            if(this.liga){
                break;
            }
        }
        let self = this;
        setInterval(function(){
            self.checa_botao(self);
        }, 1000);
        N.inicio();
    }
    
    checa_botao(self){
        if(b.digitalRead(self.button) == 0){
            // return function a(self.start_program);
            // self.start_program();
            process.exit(1);
        }
    }
    
    
}

let Otto = new Robot();

Otto.start_program();

// let b_read = b.digitalRead(button)
// if (b_read == 1) {
//     b.digitalWrite(ladar, 1);
// } else {
//     b.digitalWrite(ladar, 0);
// }