var rc = require('roboticscape');

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
rc.motor(1, 0.3);
rc.motor(2, 0.3);
rc.motor(3, 0.3);
rc.motor(4, 0.3);

/* Read encoder every second until PAUSE button pressed */
setInterval(function() {
    if(rc.state() == "RUNNING") {
        var enc1 = rc.encoder(1);
        var enc2 = rc.encoder(2);
        var enc3 = rc.encoder(3);
        var enc4 = rc.encoder(1);
        console.log("encoder 1 = " + enc1);
        console.log("encoder 2 = " + enc2);
        console.log("encoder 3 = " + enc3);
        console.log("encoder 4 = " + enc4);
    } else {
        /* The robotics cape userspace interface is automatically freed on exit */
        process.exit();
    }
}, 1000);