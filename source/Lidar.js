'use strict';
let byte = new Int8Array(22);
let ladar = 'GP1_4';
let b = require('bonescript');

b.pinMode(ladar, b.OUTPUT);
b.digitalWrite(ladar, 0);

const conv = require('binstring');
const fs = require('fs');

class LIDAR {

    constructor(){
        this.b = require('bonescript');
        const fs = require('fs');
        this.port = '/dev/ttyO1';

        this.options = {baudrate: 115200}

    }

    decode_string(string){
        console.log(string);
        fs.appendFileSync("./outfile.txt", string + "\n", function(err) {
            if(err) {
                return console.log(err);
            }
        }); 
        
        let data = [];

        string = string.replace('\n', '');
    
        string = string.split(":").slice(0,21);

        for(b in string){
            data.push(parseInt(string[b],16));
        }

        let start = data[0];
        let idx = data[1] - 0xa0;
        let speed = parseFloat(data[2] | (data[3] << 8)) / 64.0;
        let in_checksum = data[-2] + (data[-1] << 8);

        // first data package (4 bytes after header)
        let angle = idx*4 + 0;
        let angle_rad = angle * Math.PI / 180.0;
        let dist_mm = data[4] | ((data[5] & 0x1f) << 8);
        let quality = data[6] | (data[7] << 8);

        if (data[5] & 0x80){
             console.log("X - ");
           }
        else{
            console.log("O - ");
          }
        if (data[5] & 0x40){
             console.log("NOT GOOD");
           }
        console.log("Speed: " + speed + ", angle: " + angle + ", dist: " + dist_mm + ", quality: " + quality);
        console.log("-----------");
    }
 }



let l = new LIDAR();

const ByteLength = require('@serialport/parser-byte-length');
var SerialPort = require('serialport');
var sp = new SerialPort("/dev/ttyO1",
                      {baudRate:115200},
                      function(){
                          const parser = sp.pipe(new ByteLength({length: 1}));
                          console.log("yay");
                          b.digitalWrite(ladar, 1);
                           let started = false;
                            let string = "Start";
                            parser.on('data', function(data){
                                    if (data != ''){
                                        let enc = (Buffer.from(data).toString('hex') + ":");
                                        if (enc == "fa:"){
                                            if(started){
                                                try{
                                                    l.decode_string(string);
                                                }
                                                catch(e){ // Except esta errado
                                                    console.log("erro");
                                                }
                                            }
                                            started = true;
                                            string = "fa:";
                                        }
                                        else if(started){
                                            string += enc;
                                        }
                                        else{
                                            console.log("Waiting for start");
                                        }
                                    }
                            })
                        //   l.read_data();
                      });
