class Communication {
    
    constructor (){
        let io = require('socket.io-client');
        this.socket = io.connect('http://192.168.8.75:8080');
        this.socket.on('connect',function() {
            console.log('Client has connected to the server!');
        });
    }
    
    sendEncoderValues(enc1, enc2, enc3, enc4) {
        console.log("Entro aqui")
        this.socket.emit('encoders', enc1, enc2, enc3, enc4);
    }
    
    sendMotorValues(m1, m2, m3, m4) {
        let m1_speed = Math.abs(m1)
        let m2_speed = Math.abs(m2)
        let m3_speed = Math.abs(m3)
        let m4_speed = Math.abs(m4)
        let m1_dir = m1 > 0 ? 1 : m1 == 0 ? 0 : -1;
        let m2_dir = m2 > 0 ? 1 : m2 == 0 ? 0 : -1;
        let m3_dir = m3 > 0 ? 1 : m3 == 0 ? 0 : -1;
        let m4_dir = m4 > 0 ? 1 : m4 == 0 ? 0 : -1;
        this.socket.emit('motors', m1_speed, m2_speed, m3_speed, m4_speed,
                         m1_dir, m2_dir, m3_dir, m4_dir);
    }
    
    sendPIDValues(adj, p, i, d, kp, ki, kd, l_error, r_error, enc1, enc2, enc3, enc4){
         this.socket.emit('pid', adj, p, i, d, kp, ki, kd,
                          l_error, r_error, enc1, enc2, enc3, enc4);
    }
    
}

module.exports = Communication;
