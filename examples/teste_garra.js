 var rc = require('roboticscape');
//  var bs = require("bonescript")

//  bs.Initialize()
//  bs.State("RUNNING")
//  bs.Servo("ENABLE")
//  bs.Servo("POWER_RAIL_ENABLE")
//  setTimeout(bs.servo(1, -0.5), 500);
//  setTimeout(bs.servo(1, 0.5), 500);
//  setTimeout(bs.servo(1, -0.5), 500);
//  setTimeout(bs.servo(1, 0.5), 500);

 rc.initialize();
 rc.state("RUNNING");
 rc.servo("ENABLE");
 rc.servo("POWER_RAIL_ENABLE");



rc.servo(1, -0.5);
