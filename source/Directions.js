'use strict';

let b = require('bonescript');
let rc = require('roboticscape');

class Directions {
  
   /**
   * Summary.
   *
   * Description.
   *
   * @since      x.x.x
   * @deprecated x.x.x Use new_function_name() instead.
   * @access     private
   *
   * @class
   * @augments parent
   * @mixes    mixin
   *
   * @alias    realName
   * @memberof namespace
   *
   * @see  Function/class relied on
   * @link URL
   * @global
   *
   * @fires   eventName
   * @fires   className#eventName
   * @listens event:eventName
   * @listens className~event:eventName
   *
   * @param {type}   var           Description.
   * @param {type}   [var]         Description of optional variable.
   * @param {type}   [var=default] Description of optional variable with default variable.
   * @param {Object} objectVar     Description.
   * @param {type}   objectVar.key Description of a key in the objectVar parameter.
   *
   * @yield {type} Yielded value description.
   *
   * @return {type} Return value description.
   */
  constructor() {
    const { spawnSync } = require( 'child_process' )
    let config_pin = spawnSync( 'config-pin', [ 'P8_15', 'pruin' ]);
    
    rc.initialize();
    rc.state("RUNNING");
    rc.motor("ENABLE");
    rc.imu("ENABLE");
    
    this.CPR = 1496.88
    this.RADIUS = 39.905 // (mm)

    this.last_enc_read = [0, 0, 0, 0]
    this.last_speed = [0, 0, 0, 0]

    this.last_time = 0
    this.ref_speed = 300

    this.prev_accel_time = 0
    this.prev_time = 0
    this.angle = 0

    this.last_left_speed = 0
    this.last_right_speed = 0

    this.last_left_enc = 0
    this.last_right_enc = 0
    
    this.clear_interval = false

    this.LEFT_BOTTOM_MOTOR = 1
    this.LEFT_TOP_MOTOR = 2
    this.RIGHT_TOP_MOTOR = 3
    this.RIGHT_BOTTOM_MOTOR = 4

    this.POT_BASE = 0.4
    this.displacement = 0
  }
  

  goFoward() {
      rc.motor(this.LEFT_BOTTOM_MOTOR, this.POT_BASE); //fwd
      rc.motor(this.LEFT_TOP_MOTOR, this.POT_BASE); //fwd
      rc.motor(this.RIGHT_TOP_MOTOR, -this.POT_BASE); //fwd - Right com potencia negativa vai pra frente!
      rc.motor(this.RIGHT_BOTTOM_MOTOR, -this.POT_BASE); //fwd
  }
  
  goLeft() {
      rc.motor(this.LEFT_BOTTOM_MOTOR, this.POT_BASE); // fwd
      rc.motor(this.LEFT_TOP_MOTOR, -this.POT_BASE); // rev
      rc.motor(this.RIGHT_TOP_MOTOR, -this.POT_BASE); //fwd
      rc.motor(this.RIGHT_BOTTOM_MOTOR, this.POT_BASE); // rev
  }
  
  TurnRight(){
      rc.motor(this.LEFT_BOTTOM_MOTOR, this.POT_BASE); 
      rc.motor(this.LEFT_TOP_MOTOR, this.POT_BASE); 
      rc.motor(this.RIGHT_TOP_MOTOR, this.POT_BASE); 
      rc.motor(this.RIGHT_BOTTOM_MOTOR, this.POT_BASE);
  }
  
  TurnLeft(){
      rc.motor(this.LEFT_BOTTOM_MOTOR, -this.POT_BASE); 
      rc.motor(this.LEFT_TOP_MOTOR, -this.POT_BASE); 
      rc.motor(this.RIGHT_TOP_MOTOR, -this.POT_BASE); 
      rc.motor(this.RIGHT_BOTTOM_MOTOR, -this.POT_BASE);
  }
  
  
  // Angle
  GetGiro() {
    let time = new Date().getTime();
    if(this.prev_time != 0) {
       let gyro = rc.imu("READ_GYRO").gyro
       this.angle += gyro[2] * (time - this.prev_time)/1000.0; 
    }
    this.prev_time = time;
  }
  
  GetDisplacement() {
    let time = new Date().getTime();
    if(this.prev_accel_time != 0) {
       let accel = rc.imu("READ_ACCEL").accel
       this.displacement += accel[0] * (time - this.prev_accel_time)/1000.0; 
    }
    this.prev_accel_time = time;
  }
  
  GetDist(){
    let i = 1
    let enc_read = 0
    let dist = 0
    
    for(i=1; i <= 4; i++){
      enc_read = rc.encoder(i)
      
      enc_read = (enc_read/this.CPR) * 2*Math.PI*this.RADIUS
      enc_read = Math.abs(enc_read)
      
      dist += enc_read
    }
    
    return (dist/4.0)
  }
  
  SpeedControlX(direction){
    let adjust = 0
    let base_pwr = 0.5
    let kp = 6.8125, ki = 0.7 , kd = 7.0 //6.8125 
    let integral = 0.0
    let derivate = 0;
    let dir = 0
    let preto = 0
    let lastError = 0
    let lbm_pwr = 0.7, ltm_pwr=0.7, rtm_pwr=0.7, rbm_pwr=0.7
    
    let self = this
    setInterval(function(){
      self.GetGiro()
      let error = ((self.angle*direction)-dir)/1000
      // let dist = self.GetDist()
      // self.GetDisplacement()
      // console.log(self.displacement)
      // let error = ((self.displacement*direction)-dir)/10
      console.log(error)

      integral += error;
      if (integral > 1) {
        integral = 1.0;
      } else if (integral < -1) {
        integral = -1.0;
      }
      derivate = error - lastError;
      
      adjust = kp*error + ki*integral + kd*derivate
      
      lbm_pwr += adjust
      ltm_pwr += adjust
      rtm_pwr -= adjust
      rbm_pwr -= adjust
      
      rc.motor(self.LEFT_BOTTOM_MOTOR, (lbm_pwr * direction))
      rc.motor(self.LEFT_TOP_MOTOR, -(ltm_pwr * direction))
      rc.motor(self.RIGHT_TOP_MOTOR, -(rtm_pwr * direction))
      rc.motor(self.RIGHT_BOTTOM_MOTOR, (rbm_pwr * direction))
      
      lastError = error;
      
      // if (Math.abs(dist) >= Math.abs(distance) && distance != 0) {
      //   clearTimeout(this)
      // }
      
      // if(color == preto) {
      //   clearTimeout(this)
      // }
      
      if(self.clear_interval == true) {
        self.breakMotors()
        clearTimeout(this)
      }

    },200)
  }

  SpeedControlY(direction){
    let adjust = 0
    let base_pwr = 0.5
    let kp = 4.375, ki = 0.71875 , kd = 7.0
    let integral = 0.0
    let derivate = 0;
    let dir = 0
    let preto = 0
    let lastError = 0
    let lbm_pwr = 0.5, ltm_pwr=0.5, rtm_pwr=0.5, rbm_pwr=0.5
    
    let self = this
    setInterval(function(){
      // let dist = self.GetDist()
      self.GetGiro()
      
      let error = ((self.angle*direction)-dir)/1000
      
      integral += error;
      if (integral > 1) {
        integral = 1.0;
      } else if (integral < -1) {
        integral = -1.0;
      }
      derivate = error - lastError;
      
      adjust = kp*error + ki*integral + kd*derivate
      
      lbm_pwr += adjust
      ltm_pwr += adjust
      rtm_pwr -= adjust
      rbm_pwr -= adjust
      
      rc.motor(self.LEFT_BOTTOM_MOTOR, (lbm_pwr * direction))
      rc.motor(self.LEFT_TOP_MOTOR, (ltm_pwr * direction))
      rc.motor(self.RIGHT_TOP_MOTOR, -(rtm_pwr * direction))
      rc.motor(self.RIGHT_BOTTOM_MOTOR, -(rbm_pwr * direction))
      
      lastError = error;
      
      //console.log(dist)
      // if (Math.abs(dist) >= Math.abs(distance) && distance != 0) {
      //   clearTimeout(this)
      // }
      
      if(this.clear_interval == true) {
        clearTimeout(this)
      }

    },200)
  }

  zeroEncoders(){
    rc.encoder(this.motor_left_bottom, 0);
    rc.encoder(this.motor_left_top, 0);
    rc.encoder(this.motor_right_top, 0);
    rc.encoder(this.motor_right_bottom, 0);
  }
  
  breakMotors(){
    rc.motor(4, "BRAKE");
    rc.motor(3, "BRAKE");
    rc.motor(2, "BRAKE");
    rc.motor(1, "BRAKE");
  }
  
  disableMotors(){
    rc.motor("DISABLE");
  }
}

// 
// let d = new Directions()
// 
// -1 = direita 
// 1 = esquerda
// d.SpeedControlX(1)

module.exports = Directions;