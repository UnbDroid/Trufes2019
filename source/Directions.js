'use strict';

let Communication = require("./Communication");
let rc = require('roboticscape');
var spawn = require('child_process').spawn;
var math = require('mathjs')


class Directions {

  constructor () {
    rc.initialize();
    rc.state("RUNNING");
    rc.motor("ENABLE");
    rc.imu("ENABLE");
    
    this.motor_left_bottom = 1
    this.motor_left_top = 2
    this.motor_right_top = 3
    this.motor_right_bottom = 4
    
    
    let base_pwr = 0.0
    this.mlb_pwr = base_pwr
    this.mlt_pwr = base_pwr
    this.mrt_pwr = base_pwr
    this.mrb_pwr = base_pwr
    
    this.integral = 0.0
    this.lastError = 0.0
    
    this.periodo = 2 //ms
    this.left_speed = 0.0
    this.right_speed = 0.0

    this.last_left_speed = 0.0
    this.last_right_speed = 0.0
    this.last_left_enc = 0.0
    this.last_right_enc = 0.0
    
    this.prev_time_di = 0
    
    // this.gyro = 0;
    this.angleZ = 0; 
    this.prev_time = 0;
    
    this.angleZ_accel = 0;
    this.prev_time_accel = 0
    
    this.dist = 0
    this.distmm = 0
    this.prev_time_speed = 0
    this.disc_integrator = math.matrix([[0], [0]])
    
    this.fe = math.matrix([[0, 0, 0, 0],
                           [0, 0, 0, 0]])
    this.fi = math.matrix([[0, 0],
                           [0, 0]])
                           
    let self = this
    setInterval(function() {
      self.leftSpeed()
      self.rightSpeed()
    }, self.periodo)
    
    setInterval(function() {
        self.getGiro()
        self.getSpeed()
    }, 0.1)
  }
  
  move(dist, orient) {
    let ref_mat = math.matrix([[dist], [orient]])
    this.control(ref_mat)
  }
  
  control(ref_mat) {
    let dist = this.distmm
    let gyro_angle = this.angleZ
    let system_values = math.matrix([[dist], [this.degToRad(gyro_angle)], [this.left_speed], [this.right_speed]]);
    console.log("INPUT = " + system_values)
    let feedback_mat = math.matrix([[dist], [gyro_angle]])
    console.log(feedback_mat)
    let FeU = math.multiply(this.fe, system_values)
    console.log(FeU)
    let ref_feedback = math.subtract(ref_mat, feedback_mat)
    console.log(ref_feedback)
  
    let time = new Date().getTime();
    if (this.prev_time_di != 0) {
      let ele1 = this.disc_integrator.get([0, 0]) + ref_feedback.get([0, 0]) * (time - this.prev_time_di)/1000.0;
      let ele2 = this.disc_integrator.get([1, 0]) + ref_feedback.get([1, 0]) * (time - this.prev_time_di)/1000.0;
      this.disc_integrator = math.matrix([[ele1], [ele2]])
    }
    this.prev_time_di = time;

    let FiU = math.multiply(this.fi, this.disc_integrator)
    FiU = math.multiply(FiU, -1)
    let sinal = math.subtract(FiU, FeU)
    console.log("Sinal ===============")
    console.log(sinal)
    
    let left_adjust = sinal.get([0, 0])
    let right_adjust = sinal.get([1, 0])
    
    if (left_adjust > 95) {
      left_adjust = 95
    } else if (left_adjust < -95) {
      left_adjust = -95
    }
    
    if (right_adjust > 95) {
      right_adjust = 95
    } else if (right_adjust < -95) {
      right_adjust = -95
    }
    
    left_adjust /= 100
    right_adjust /= 100
    
    this.left_pwr = left_adjust
    this.right_pwr = right_adjust
    
  }

  goFoward() {
      rc.motor(this.motor_left_bottom, this.left_pwr); //fwd
      rc.motor(this.motor_left_top, this.left_pwr); //fwd
      rc.motor(this.motor_right_top, -this.right_pwr); //fwd - Right com potencia negativa vai pra frente!
      rc.motor(this.motor_right_bottom, -this.right_pwr); //fwd
  }
  
  goLeft() {
      rc.motor(this.motor_left_bottom, 0.8); // fwd
      rc.motor(this.motor_left_top, -0.8); // rev
      rc.motor(this.motor_right_top, -0.8); //fwd
      rc.motor(this.motor_right_bottom, 0.8); // rev
  }
  
  goRight() {
      rc.motor(this.motor_left_bottom, -0.8); //rev
      rc.motor(this.motor_left_top, 0.8); // fwd
      rc.motor(this.motor_right_top, 0.8); //rev
      rc.motor(this.motor_right_bottom, -0.8); //fwd
  }
  
  goBack() {
      rc.motor(this.motor_left_bottom, -this.mlb_pwr); //rev
      rc.motor(this.motor_left_top, -this.mlt_pwr); //rev
      rc.motor(this.motor_right_top, this.mrt_pwr); //rev
      rc.motor(this.motor_right_bottom, this.mrb_pwr); //rev
  }
  
  leftSpeed() {
    let mlb_enc = rc.encoder(this.motor_left_bottom)
    let mlt_enc = rc.encoder(this.motor_left_top)
    // console.log(mlb_enc, mlt_enc)

    let enc_read = (mlb_enc + mlt_enc)/2.0
  
    this.left_speed = ((30*enc_read) - (30*this.last_left_enc) + (Math.exp(-30*this.periodo) * this.last_left_speed))*-1
    
    this.last_left_speed = this.left_speed
    this.last_left_enc = enc_read
  }
  
  rightSpeed() {
    let mrt_enc = rc.encoder(this.motor_right_top)
    let mrb_enc = rc.encoder(this.motor_right_bottom)
    // console.log(mrt_enc, mrb_enc)

    let enc_read = (mrt_enc + mrb_enc)/2.0
  
    this.right_speed = (30*enc_read) - (30*this.last_right_enc) + (Math.exp(-30*this.periodo) * this.last_right_speed)
    
    this.last_right_speed = this.right_speed
    this.last_right_enc = enc_read
  }
  
  getGiro() {
    let time = new Date().getTime();
    if(this.prev_time != 0) {
       let gyro = rc.imu("READ_GYRO").gyro
       this.angleZ += gyro[2] * (time - this.prev_time)/1000.0; 
    }
    this.prev_time = time;
  }
  
  degToRad(deg) {
    return (deg * Math.PI) / 180
  }
  
  radToDeg(rad) {
    return rad * 180 / Math.PI;
  }

  // getDist() {
  //   let time = new Date().getTime();
  //   if (this.prev_time_accel != 0) {
  //     let accel = rc.imu("READ_ACCEL").accel
  //     this.angleZ_accel += accel[0] * (time - this.prev_time_accel)/1000.0; 
  //     this.dist += (this.angleZ_accel * (time - this.prev_time_accel)/1000.0);
  //     this.distmm = this.dist*1000
  
  //   }
  //   this.prev_time_accel = time;
  // }

  getSpeed() {
    let time = new Date().getTime();
    if (this.prev_time_accel != 0) {
      let accel = rc.imu("READ_ACCEL").accel
      this.angleZ_accel += accel[0] * (time - this.prev_time_accel)/1000.0; 
      // console.log(this.angleZ_accel)
    }
    this.prev_time_accel = time;
    this.getDist(this.angleZ_accel)
  }
  
  getDist(speed) {
    let time = new Date().getTime();
    if (this.prev_time_speed != 0) {
      this.dist += speed * (time - this.prev_time_speed)/1000.0;
      // console.log(this.dist)
      this.distmm = this.dist*1000
      // console.log(this.angleZ_accel)
    }
    this.prev_time_speed = time
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

var c = new Directions();
// setInterval(function(){
//   c.move(0, 0)
//   c.goFoward()
// }, 500)

while(true) {
  c.goRight()
}

// setTimeout(function(){
//   console.log("Angulo em Grau: " + c.angleZ)
//   console.log("Angulo em Radiano: " + c.radGiro(c.angleZ))
//   console.log("Left Speed: " + c.left_speed)
//   console.log("Right Speed: " + c.right_speed)
//   console.log("Distancia: " + c.dist)
//   c.breakMotors()
// },2000)

// module.exports = Directions;