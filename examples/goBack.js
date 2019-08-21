/* Allocate the userspace usage of the robotics cape features */
let rc = require('roboticscape');
rc.initialize();

/* Set the state to RUNNING */
rc.state("RUNNING");
rc.motor("ENABLE");

while(true){
rc.motor(1, -0.5)
rc.motor(2, -0.5)
rc.motor(3, 0.5)
rc.motor(4, 0.5)
}