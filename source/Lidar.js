'use strict';
let byte = new Int8Array(22);

const SerialPort = require('serialport')
const ByteLength = require('@serialport/parser-byte-length')
const port = new SerialPort('/dev/ttyO1', { baudRate: 115200 })
const parser = port.pipe(new ByteLength({length: 8}))

// const parser = new Readline()
// port.pipe(parser)

// parser.on('data', line => console.log(`> ${line}`))
// port.write('ROBOT POWER ON\n')

class LIDAR {

    constructor(){
        this.b = require('bonescript');
        const fs = require('fs');
        this.port = '/dev/ttyO1';

        this.options = {baudrate: 115200}

    }

    decode_string(){
        let data = [];

        let string = string.replace('\n', '');

        for(byte in string.split(":").slice(0, 21)){
            data.push(parseInt(byte,16));
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
        console.log("Checksum: " + this.checksum(data) + ", from packet: " + in_checksum);
        this.fs.appendFile("sad.txt", string+"\n");
        console.log("-----------");


        // let parity=serial.PARITY_NONE
        // let stopbits=serial.STOPBITS_ONE
        // let bytesize=serial.EIGHTBITS
        // let timeout=0
    }

    read_data(){
        byte = parser.on('data', data => console.log(`data: ${data}`))
        let started = false;
        let string = "Start";
        while (true){
            if (byte != ''){
                let enc = (byte.encode('hex') + ":");
                if (enc == "fa:"){
                    if(started){
                        try{
                            this.decode_string(string);
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
            byte = parser.on('data', data => console.log(`data: ${data}`))
          }
        console.log("End");
    }
    
    onSerial(x) {
        if (x.event == 'data') {
            return x.data;
        }else{
            return '';
        }
    }
}



let l = new LIDAR();
l.read_data();
