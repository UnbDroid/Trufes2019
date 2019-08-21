var rc = require('roboticscape');

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
rc.motor(3, 0.8);
let enc1 = rc.encoder(3)
while(enc1 > -1500) {
   enc1 = rc.encoder(3)
   console.log(enc1)    
}
rc.motor("BRAKE")