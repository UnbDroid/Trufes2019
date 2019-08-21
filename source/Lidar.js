'use strict';

class LIDAR {

    function constructor(){
        var b = require('bonescript');
        let port = '/dev/ttyO1'
        let baudrate=115200

        var options = {baudrate: 9600}

        b.serialOpen(port, options);
    }

    function decode_string(){
        let data = []

        for byte in string.strip("\n").split(":")[:21]: // Falta mudar isso aqui
            data.append(int(byte,16))

        let start = data[0]
        let idx = data[1] - 0xa0
        let speed = float(data[2] | (data[3] << 8)) / 64.0
        let in_checksum = data[-2] + (data[-1] << 8)

        // first data package (4 bytes after header)
        let angle = idx*4 + 0
        let angle_rad = angle * math.pi / 180.
        let dist_mm = data[4] | ((data[5] & 0x1f) << 8)
        let quality = data[6] | (data[7] << 8)

        if (data[5] && 0x80){
          console.log("X - ")
        }
        else{
          console.log("O - ")
        }
        if (data[5] && 0x40){
          console.log("NOT GOOD")
        }

        console.log("Speed: ", speed, ", angle: ", angle, ", dist: ",dist_mm, ", quality: ", quality)
        console.log(print "Checksum: ", checksum(data), ", from packet: ", in_checksum)
        outfile.write(string+"\n")
        console.log("-----------")


        // let parity=serial.PARITY_NONE
        // let stopbits=serial.STOPBITS_ONE
        // let bytesize=serial.EIGHTBITS
        // let timeout=0
    }

    function read_data(){
        byte = f.read(1)
        started = false
        string = "Start"
        while (true){
            if (byte != '') {
                enc = (byte.encode('hex') + ":")

                if (enc == "fa:") {
                    if (started){
                        try{
                            decode_string(string)
                        }
                        catch(e){ // Verificar se dessa forma vai dar certo
                            console.log(e)
                        }
                    }
                    started = true
                    string = "fa:"
                  } else if (started){
                    string += enc
                    }
                else{
                    console.log("Waiting for start")
                  }
            }


            byte = f.read(1)
          }
        outfile.close()
        console.log("End")
}
