'use strict';

let Communication = require("./Communication");
let rc = require('roboticscape');
var spawn = require('child_process').spawn;


class Directions {

  constructor () {
    // let conf_e4 = spawn('config-pin P8_15 pruin')
    // conf_e4.on('data', function (data) {
    //   console.log(data);
    // });
    
    rc.initialize();
    rc.state("RUNNING");
    rc.motor("ENABLE");
    
  
    
    this.motor_left_bottom = 1
    this.motor_left_top = 2
    this.motor_right_top = 3
    this.motor_right_bottom = 4
    
    
    let base_pwr = 0.3
    this.mlb_pwr = base_pwr
    this.mlt_pwr = base_pwr
    this.mrt_pwr = base_pwr
    this.mrb_pwr = base_pwr
    
    this.integral = 0.0
    this.lastError = 0.0

  }

  async goFoward() {
      rc.motor(this.motor_left_bottom, this.mlb_pwr); //fwd
      rc.motor(this.motor_left_top, this.mlt_pwr); //fwd
      rc.motor(this.motor_right_top, -this.mrt_pwr); //fwd - Right com potencia negativa vai pra frente!
      rc.motor(this.motor_right_bottom, -this.mrb_pwr); //fwd
      this.calculatePID()
  }
  
  goLeft(){
      rc.motor(this.motor_left_bottom, this.mlb_pwr); // fwd
      rc.motor(this.motor_left_top, -this.mlt_pwr); // rev
      rc.motor(this.motor_right_top, -this.mrt_pwr); //fwd
      rc.motor(this.motor_right_bottom, this.mrb_pwr); // rev
      this.calculatePID()
  }
  
  goRight(){
    rc.motor(this.motor_left_bottom, -this.mlb_pwr); //rev
      rc.motor(this.motor_left_top, this.mlt_pwr); // fwd
      rc.motor(this.motor_right_top, this.mrt_pwr); //rev
      rc.motor(this.motor_right_bottom, -this.mrb_pwr); //fwd
      this.calculatePID()
  }
  
  goBack(){
      rc.motor(this.motor_left_bottom, -this.mlb_pwr); //rev
      rc.motor(this.motor_left_top, -this.mlt_pwr); //rev
      rc.motor(this.motor_right_top, this.mrt_pwr); //rev
      rc.motor(this.motor_right_bottom, this.mrb_pwr); //rev
      this.calculatePID()
  }
  
  
   zeroEncoders(){
    rc.encoder(this.motor_left_bottom, 0);
    rc.encoder(this.motor_left_top, 0);
    rc.encoder(this.motor_right_top, 0);
    rc.encoder(this.motor_right_bottom, 0);
  }
  
  breakMotors(){
    rc.motor(1, "BRAKE");
    rc.motor(2, "BRAKE");
    rc.motor(3, "BRAKE");
    rc.motor(4, "BRAKE");
  }
  
  disableMotors(){
    rc.motor("DISABLE");
  }
  
  
  async calculatePID() {
      let KP = 0.0000004
      let KI = 0.0000000
      let KD = 0.0000000
      let mlb_enc = rc.encoder(this.motor_left_bottom)
      let mlt_enc = rc.encoder(this.motor_left_top)
      let mrt_enc = rc.encoder(this.motor_right_top)
      let mrb_enc = rc.encoder(this.motor_right_bottom)
      let error_left = (Math.abs(mlt_enc) + Math.abs(mlb_enc))/2.0;
      let error_right = (Math.abs(mrt_enc) + Math.abs(mrb_enc))/2.0;
      let error = error_left - error_right;
      

      this.integral += error;
      
      if (this.integral > 100) {
          this.integral = 100;
      } else if (this.integral < -100) {
          this.integral = -100;
      }
      
      let derivate = error - this.lastError;
      let adjust = (KP * error) + (KI*this.integral) + (KD*derivate);
      console.log("Ajuste: " + adjust)
      console.log("Erro: " + error)
      
      this.mlt_pwr -= adjust
      this.mlb_pwr -= adjust
      this.mrt_pwr += adjust
      this.mrt_pwr += adjust
      
      console.log(mlb_enc, mlt_enc, mrt_enc, mrb_enc)
      
      // comm.sendEncoderValues(mlb_enc, mlt_enc, mrt_enc, mrb_enc);
      // this.comm.sendPIDValues(adjust, error, this.integral, derivate, KP, KI, KD,
                                  // error_left, error_right, mlb_enc, mlt_enc, mrt_enc, mrb_enc);
      // this.comm.sendMotorValues(this.mlb_pwr, this.mlt_pwr, this.mrt_pwr, this.mrt_pwr)  
        
      this.lastError = error;
    }
}

var c = new Directions();
let comm = new Communication();
while(true) {
  c.goFoward();  
}






// const readline = require('readline');
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);


// process.stdin.on('keypress', (str, key) => {
//   if (key.ctrl && key.name === 'c') {
//     console.log("Entro aqui2")
//     process.exit();
//   } else {
//     if (key.name === 'w') {
//       console.log("Frente")
//       c.breakMotors()
//       c.goFoward();
//     } else if (key.name === 'a') {
//       console.log("Esquerda")
//       c.breakMotors()
//       c.goLeft();
//     } else if (key.name === 's') {
//       console.log("Direita")
//       c.breakMotors()
//       c.goBack();
//     } else  if (key.name === 'd') {
//       console.log("Re")
//       c.breakMotors()
//       c.goRight();
//     } else {
//       c.breakMotors()
//     }
//   }
// });

// module.exports = Directions;