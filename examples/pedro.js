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

let fe = 0.3;
let te = 0.3;
let fd = 0.3;
let td = 0.3;

console.log("Iniciou");
rc.motor(1, td);//TD
rc.motor(2, fe);//FE
rc.motor(3, te);//TE
rc.motor(4, fd);//FD

setTimeout(function(){
    console.log("2s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, -te);//TE
    rc.motor(4, -fd);//FD
}, 2000);

setTimeout(function (){
    console.log("4s");
    rc.motor(1, td);//TD
    rc.motor(2, fe);//FE
    rc.motor(3, te);//TE
    rc.motor(4, fd);//FD
}, 4000);

setTimeout(function (){
    console.log("6s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, -te);//TE
    rc.motor(4, -fd);//FD
}, 6000);

setTimeout(function (){
    console.log("8s");
    rc.motor(1, td);//TD
    rc.motor(2, fe);//FE
    rc.motor(3, te);//TE
    rc.motor(4, fd);//FD
}, 8000);

setTimeout(function (){
    console.log("10s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, -te);//TE
    rc.motor(4, -fd);//FD
}, 10000);

setTimeout(function (){
    console.log("12s");
    rc.motor(1, td);//TD
    rc.motor(2, fe);//FE
    rc.motor(3, te);//TE
    rc.motor(4, fd);//FD
}, 12000);

setTimeout(function (){
    console.log("14s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, -te);//TE
    rc.motor(4, -fd);//FD
}, 14000);

setTimeout(function (){
    console.log("16s");
    rc.motor(1, td);//TD
    rc.motor(2, fe);//FE
    rc.motor(3, te);//TE
    rc.motor(4, fd);//FD
}, 16000);

setTimeout(function (){
    console.log("18s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, -te);//TE
    rc.motor(4, -fd);//FD
}, 18000);

// setTimeout(function (){
//     console.log("end")
// }, 20000);

// rc.motor(1, -0.5);//TD
// rc.motor(2, -0.5);//FE
// rc.motor(3, 0.52);//TE
// rc.motor(4, 0.5);//FD

// setTimeout(function tempo(){
//     console.log("Zé ta fora");
// }, 100);

// console.log("Wallif Perdeu já");
// rc.motor(1, 0.5);//TD
// rc.motor(2, -0.5);//FE
// rc.motor(3, -0.52);//TE
// rc.motor(4, 0.5);//FD

// function direita(){
// rc.motor("ENABLE");
// rc.motor(1, 0.5);//TD
// rc.motor(2, -0.5);//FE
// rc.motor(3, 0.52);//TE
// rc.motor(4, -0.5);//FD
// };

// function frente(){
// rc.motor("ENABLE");
// rc.motor(1, -0.5);//TD
// rc.motor(2, 0.5);//FE
// rc.motor(3, -0.52);//TE
// rc.motor(4, 0.5);//FD
// };

/* Read encoder every second until PAUSE button pressed */
