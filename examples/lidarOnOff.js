var b = require('bonescript');

let ladar = 'P9_21'

const { spawnSync } = require( 'child_process' )
let config_pin = spawnSync( 'config_pin', [ 'P9_21', 'gpio' ] );


b.pinMode(ladar, b.OUTPUT);

setTimeout(function(){
    b.digitalWrite(ladar, 0);
},2000)

setTimeout(function(){
    b.digitalWrite(ladar, 1);
},4000)

setTimeout(function(){
    b.digitalWrite(ladar, 0);
},6000)

setTimeout(function(){
    b.digitalWrite(ladar, 1);
},8000)