let b = require('bonescript');
let rc = require('roboticscape');
const { spawnSync } = require( 'child_process' )

let LEFT_BOTTOM_MOTOR = 1
let LEFT_TOP_MOTOR = 2
let RIGHT_TOP_MOTOR = 3
let RIGHT_BOTTOM_MOTOR = 4

let CPR = 1496.88
let RADIUS = 39.905 // (mm)

let last_enc_read = [0, 0, 0, 0]
let last_speed = [0, 0, 0, 0]

let last_time = 0
let ref_speed = 300

let prev_time = 0
let angle = 0

var last_left_speed = 0
var last_right_speed = 0

var last_left_enc = 0
var last_right_enc = 0

function GetDist(){
  let i = 1
  let enc_read = 0
  // let speed = 0
  let dist = 0
  
  for(i=1; i <= 4; i++){
    enc_read = rc.encoder(i)
    
    enc_read = (enc_read/CPR) * 2*Math.PI*RADIUS
    enc_read = Math.abs(enc_read)
    
    dist += enc_read
  }
  
  return (dist/4.0)
}


//Z = 2 = FWD or rev
//Y = 1
function GetGiro() {
    let time = new Date().getTime();
    if(prev_time != 0) {
       let gyro = rc.imu("READ_GYRO").gyro
       angle += gyro[2] * (time - prev_time)/1000.0; 
    }
    prev_time = time;
}

function SpeedControlY(distance, direction) {
  
}

// direction = 1 fwd
// direction = -1 rev
function SpeedControlX(distance, direction){
  let adjust = 0
  let base_pwr = 0.5
  let kp = 4.375, ki = 0.71875 , kd = 7.0 //7265625
  let integral = 0.0
  let derivate = 0;
  let dir = 0
  let lastError = 0
  let lbm_pwr = 0.5, ltm_pwr=0.5, rtm_pwr=0.5, rbm_pwr=0.5
  
  
  setInterval(function(){
    let dist = GetDist()
    GetGiro()
    
    let error = ((angle*direction)-dir)/1000
    // console.log(angle)
    
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
    
    rc.motor(LEFT_BOTTOM_MOTOR, (lbm_pwr * direction))
    rc.motor(LEFT_TOP_MOTOR, (ltm_pwr * direction))
    rc.motor(RIGHT_TOP_MOTOR, -(rtm_pwr * direction))
    rc.motor(RIGHT_BOTTOM_MOTOR, -(rbm_pwr * direction))
    
    lastError = error;
    
    console.log(dist)
    if (Math.abs(dist) >= Math.abs(distance) && distance != 0) {
      console.log("iii saiu daqui")
      clearTimeout(this)
    }
  },200)
}

let config_pin = spawnSync( 'config-pin', [ 'P8_15', 'pruin' ]);
    
rc.initialize();
rc.state("RUNNING");
rc.motor("ENABLE");
rc.imu("ENABLE");

SpeedControlX(1000, 1)

