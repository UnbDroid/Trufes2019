var rc = require('roboticscape');
// var bs = require("bonescript")

// bs.rcInitialize()
// bs.rcState("RUNNING")
// bs.rcServo("ENABLE")
// bs.rcServo("POWER_RAIL_ENABLE")
// while(true){
//     bs.rcServo(1, 0.5)   
// }

rc.initialize();
rc.state("RUNNING");
rc.servo("ENABLE");
rc.servo("POWER_RAIL_ENABLE");



rc.servo(1, -1.5);    
rc.servo(2, -1.5);