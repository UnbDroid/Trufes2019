var rc = require('roboticscape');
const fs = require('fs') 

/* Allocate the userspace usage of the robotics cape features */
rc.initialize();

/* Set the state to RUNNING */
rc.state("RUNNING");

/* Exercise the robotics cape hardware */
rc.led("GREEN", true);
rc.on("PAUSE_PRESSED", function() { 
    console.log("PAUSE pressed");
    
    /* Set the state to EXITING */
    rc.state("EXITING");
});


rc.motor("ENABLE");

rc.imu("ENABLE");
let state = rc.imu("READ_GYRO")
console.log("Gyro: " + state.gyro)

let fe = 0.8;
let gyro = 0;
let angleX, angleY, angleZ
angleX = angleY = angleZ = 0;
let time = new Date().getTime();
let prev_time;

// rc.motor(1, fe);//TD
// rc.motor(2, fe);//FE
// rc.motor(3, -fe);//TE
// rc.motor(4, -fe);//FD

setInterval(function() {
   prev_time = time;
   time = new Date().getTime();
   gyro = rc.imu("READ_GYRO").gyro
   angleX += gyro[0] * (time - prev_time)/1000.0; 
   angleY += gyro[1] * (time - prev_time)/1000.0; 
   angleZ += gyro[2] * (time - prev_time)/1000.0; 
}, 0.001)

let i = 1
let time2 = 0
let flag = true

setTimeout(function() {
    flag = false
    console.log(time2)
}, 2000);

while(flag) {
   time2 = new Date().getTime() / i;
   i += 1
}


