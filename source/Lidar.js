'use strict';


class LIDAR {

    constructor(){
        this.ladar_pin = 'GP1_4';
        this.b = require("bonescript")
        this.b.pinMode(this.ladar_pin, this.b.OUTPUT);
        this.fs = require('fs');
        this.stop_spinning()
        this.port = '/dev/ttyO1';
        this.options = {baudrate: 115200}
        this.data = []

    }
    
    async start_spinning() {
        this.b.digitalWrite(this.ladar_pin, 1); 
    }
    
    stop_spinning(self) {
        this.b.digitalWrite(this.ladar_pin, 0); 
    }
    
    parse_data(parser, self) {
        self.start_spinning(); 
        let started = false;
        let string = "Start";
        parser.on('data', function(data){
            if (data != ''){
                let enc = (Buffer.from(data).toString('hex') + ":");
                if (enc == "fa:"){
                    if(started){
                        try{
                            // self.decode_string(string);
                            self.data.push(string)
                        } catch(e) {
                            console.log("Erro ao Ler: " + e);
                        }
                        
                        if (self.data.length == 10000){
                            self.stop_spinning()
                            let Clusters = require("./Clusters");
                            let c = new Clusters();
                            // console.log(self.data)
                            c.read_lines(self.data)
                            // c.DBSCAN()
                        }
                    }
                    started = true;
                    string = "fa:";
                } else if(started) {
                    string += enc;
                } else{
                    console.log("Esperando Rodar");
                }
            }
        });
    }

    start_serial() {
        const ByteLength = require('@serialport/parser-byte-length');
        var SerialPort = require('serialport');
        let self = this;
        var sp = new SerialPort("/dev/ttyO1", {baudRate:115200}, function() {
           const parser = sp.pipe(new ByteLength({length: 1}));
           self.parse_data(parser, self);
        });
    }

    decode_string(string){
        console.log(string)
        
        let data = [];

        string = string.replace('\n', '');
    
        string = string.split(":").slice(0,22);

        for(this.b in string){
            data.push(parseInt(string[this.b],16));
        }

        let idx = data[1] - 0xa0;
        let speed = parseFloat(data[2] | (data[3] << 8)) / 64.0;
        let angle = idx*4 + 0;
        let dist_mm = data[4] | ((data[5] & 0x1f) << 8);
        let quality = data[6] | (data[7] << 8);

        if (data[5] & 0x80) {
            console.log("X - ");
        } else {
            console.log("O - ");
        }
        
        if (data[5] & 0x40) {
            console.log("NOT GOOD");
        } else {
            console.log("Speed: " + speed + ", angle: " + angle + ", dist: " + dist_mm + ", quality: " + quality);
            console.log("-----------");   
        }
    }
 }


let l = new LIDAR();
l.start_serial();
// l.stop_spinning()