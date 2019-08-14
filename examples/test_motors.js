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

//frente
// rc.motor(1, 0.5);//TD
// rc.motor(2, 0.5);//FE
// rc.motor(3, -0.52);//TE
// rc.motor(4, -0.5);//FD

// direita
// rc.motor(1, -0.5);//TD
// rc.motor(2, 0.5);//FE
// rc.motor(3, 0.52);//TE
// rc.motor(4, -0.5);//FD

// ré
// rc.motor(1, -0.5);//TD
// rc.motor(2, -0.5);//FE
// rc.motor(3, 0.52);//TE
// rc.motor(4, 0.5);//FD

// esquerda
// rc.motor(1, -0.5);//TD
// rc.motor(2, 0.5);//FE
// rc.motor(3, 0.52);//TE
// rc.motor(4, -0.5);//FD

let fe = -0.35;
let te = 0.35;
let fd = 0.35;
let td = -0.35;

rc.motor(1, td);//TD
rc.motor(2, fe);//FE
rc.motor(3, te);//TE
rc.motor(4, fd);//FD


// console.log("Wallif Perdeu já");
// rc.motor(1, td);//TD
// rc.motor(2, fe);//FE
// rc.motor(3, -te);//TE
// rc.motor(4, -fd);//FD

// setTimeout(function curva1(){
//     console.log("Zé ta fora");
//     rc.motor(1, -td);//TD
//     rc.motor(2, fe-0.2);//FE
//     rc.motor(3, te-0.05);//TE
//     rc.motor(4, -fd);//FD
// }, 2000);

// setTimeout(function curva2(){
//     console.log("3");
//     rc.motor(1, -td-0.1);//TD
//     rc.motor(2, fe+0.1);//FE
//     rc.motor(3, te+0.1);//TE
//     rc.motor(4, -fd-0.1);//FD
// }, 5000);

// setTimeout(function drama(){
//     console.log("3");
//     rc.motor(1, 0);//TD
//     rc.motor(2, 0);//FE
//     rc.motor(3, 0);//TE
//     rc.motor(4, 0);//FD
// }, 8000);

// setTimeout(function drama(){
//     console.log("3");
//     rc.motor(1, td);//TD
//     rc.motor(2, -fe)///FE
//     rc.motor(3, -te);//TE
//     rc.motor(4, fd);//FD
// }, 10000);

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
