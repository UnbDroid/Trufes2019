'use strict';

let rc = require('roboticscape');

class Directions {

  constructor () {
    rc.initialize();
    rc.state("RUNNING");
    this.motor_left_bottom = 1
    this.motor_left_top = 2
    this.motor_right_top = 3
    this.motor_right_bottom = 4
    
    this.left_foward = 1
    this.left_backward = -1
    this.right_foward = -1
    this.right_backward = 1
        
    this.mlt_rotation = 0
    this.mlb_rotation = 0
    this.mrt_rotation = 0
    this.mrb_rotation = 0
    
    this.error = 0
    this.turn = 0
    this.derivate = 0
    this.integral = 0.0
    this.lastError = 0.0
    this.turn = 0
  }

  enableMotors(){
    rc.motor("ENABLE");
  }

  goFoward(){
      rc.motor("ENABLE");
      rc.motor(this.motor_left_top, 0.3*this.left_foward+this.turn);
      rc.motor(this.motor_left_bottom, 0.3*this.left_foward+this.turn);
      rc.motor(this.motor_right_top, 0.3*this.right_foward-this.turn);
      rc.motor(this.motor_right_bottom, 0.3*this.right_foward-this.turn);
      setInterval(this.logEncoder, 1000);
  }
  
  goLeft(){
      rc.motor("ENABLE");
      let mlt_pwr = this.left_backward*0.3
      let mlb_pwr = this.left_foward*0.3
      let mrt_pwr = this.right_foward*0.3
      let mrb_pwr = this.right_backward*0.3
      rc.motor(this.motor_left_top, mlt_pwr);
      rc.motor(this.motor_left_bottom, mlb_pwr);
      rc.motor(this.motor_right_top, mrt_pwr);
      rc.motor(this.motor_right_bottom, mrb_pwr);
      setInterval(this.logEncoder, 1000);
  }
  
  goRight(){
      rc.motor("ENABLE");
      rc.motor(this.motor_left_top, 0.2*this.left_foward); // 2
      rc.motor(this.motor_left_bottom, 0.2*this.left_backward);
      rc.motor(this.motor_right_top, 0.2*this.right_backward);
      rc.motor(this.motor_right_bottom, 0.2*this.right_foward);
      setInterval(this.logEncoder, 1000);
  }
  
  goBack(){
      rc.motor("ENABLE");
      rc.motor(this.motor_left_top, 0.3*this.left_backward);
      rc.motor(this.motor_left_bottom, 0.3*this.left_backward);
      rc.motor(this.motor_right_top, 0.3*this.right_backward);
      rc.motor(this.motor_right_bottom, 0.3*this.right_backward);
      setInterval(this.logEncoder, 1000);
  }
  
  calculatePID() {
      let KP = 1
      let KI = 0
      let KD = 0
      let error_left = rc.encoder(this.motor_left_top) - rc.encoder(this.motor_left_bottom);
      let error_right = rc.encoder(this.motor_right_top) - rc.encoder(this.motor_right_bottom);
      this.error = error_left - error_right;
      this.integral += this.error;
      
      if (this.integral > 100) {
          this.integral = 100;
      } else if (this.integral < -100) {
          this.integral = -100;
      }
      
      this.turn = (KP * this.error) + (KI*this.integral) + (KD*this.derivate);
        
      this.lastError = this.error;
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
  
  logEncoder(){
    if(rc.state() == "RUNNING") {
        var enc1 = rc.encoder(1);
        var enc2 = rc.encoder(2);
        var enc3 = rc.encoder(3);
        var enc4 = rc.encoder(4);
        console.log("encoder 1 = " + enc1);
        console.log("encoder 2 = " + enc2);
        console.log("encoder 3 = " + enc3);
        console.log("encoder 4 = " + enc4);
    } else {
        process.exit();
    }
  }
}

var c = new Directions();

// c.goFoward();
// c.goRight();
c.goLeft();

// setTimeout(function() {
//   c.breakMotors();  
// }, 2000);





module.exports = Directions;