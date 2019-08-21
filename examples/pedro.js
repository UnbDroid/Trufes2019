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

let full_data = '';
let interval;

function logEncoder(pot) {
    var end = new Date().getTime();
    var time = end - start;
    let enc1 = rc.encoder(1)
    let enc2 = rc.encoder(2)
    let enc3 = rc.encoder(3)
    let enc4 = rc.encoder(4)
    // console.log(enc1, enc2, enc3, enc4)
    let data =  time + ';' + pot + ';' + enc1  + ';' + enc2  + ';' + enc3  + ';' + enc4 + '\n'
    console.log(data)
    full_data += data
}

let fe = 0.8;
let te = 0.8;
let fd = 0.8;
let td = 0.8;

var start = new Date().getTime();
// console.log("Iniciou");
rc.motor(1, td);//TD
rc.motor(2, fe);//FE
rc.motor(3, -te);//TE
rc.motor(4, -fd);//FD
interval = setInterval(function() {
    logEncoder('80')
}, 20)



setTimeout(function(){
    clearInterval(interval);   
    // console.log("2s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, te);//TE
    rc.motor(4, fd);//FD
    interval = setInterval(function() {
        logEncoder('-80')
    } , 20)
}, 2000);

setTimeout(function (){
    clearInterval(interval);   
    // console.log("4s");
    rc.motor(1, td);//TD
    rc.motor(2, fe);//FE
    rc.motor(3, -te);//TE
    rc.motor(4, -fd);//FD
    interval = setInterval(function() {
        logEncoder('80')
    }, 20)
}, 4000);

setTimeout(function (){
    clearInterval(interval);   
    // console.log("6s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, te);//TE
    rc.motor(4, fd);//FD
    interval = setInterval(function() {
       logEncoder('-80')
    }, 20)
}, 6000);

setTimeout(function (){
    clearInterval(interval);   
    // console.log("8s");
    rc.motor(1, td);//TD
    rc.motor(2, fe);//FE
    rc.motor(3, -te);//TE
    rc.motor(4, -fd);//FD
    interval = setInterval(function() {
       logEncoder('80')
    }, 20)
}, 8000);

setTimeout(function (){
    clearInterval(interval);   
    // console.log("10s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, te);//TE
    rc.motor(4, fd);//FD
    interval = setInterval(function() {
       logEncoder('-80')
    }, 20)
}, 10000);

setTimeout(function (){
    clearInterval(interval);   
    // console.log("12s");
    rc.motor(1, td);//TD
    rc.motor(2, fe);//FE
    rc.motor(3, -te);//TE
    rc.motor(4, -fd);//FD
    interval = setInterval(function() {
        logEncoder('80')
    }, 20)
}, 12000);

setTimeout(function (){
    clearInterval(interval);   
    // console.log("14s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, te);//TE
    rc.motor(4, fd);//FD
    interval = setInterval(function() {
        logEncoder('-80')
    }, 20)
}, 14000);

setTimeout(function (){
    clearInterval(interval);   
    // console.log("16s");
    rc.motor(1, td);//TD
    rc.motor(2, fe);//FE
    rc.motor(3, -te);//TE
    rc.motor(4, -fd);//FD
    interval = setInterval(function() {
       logEncoder('80')
    }, 20)
}, 16000);

setTimeout(function (){
    clearInterval(interval);   
    // console.log("18s");
    rc.motor(1, -td);//TD
    rc.motor(2, -fe);//FE
    rc.motor(3, te);//TE
    rc.motor(4, fd);//FD
    interval = setInterval(function() {
       logEncoder('-80')
    }, 20)
}, 18000);

setTimeout(function (){
    fs.appendFile('datas.txt', full_data, (err) => { 
        // In case of a error throw err. 
        if (err) throw err; 
        process.exit()
    }) 
}, 20000);

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