var b = require('bonescript');
// var nmea = require('nmea');

var port = '/dev/tty02';
var options = {
    baudrate: 115200,
    // parser: b.serialParsers.readline("\n")
};


// let read_pin = 'P9_23'
// let set_pin = 'P9_26'

b.serialOpen(port, options, onSerial);

function onSerial(x) {
    if (x.err) {
        console.log('***ERROR*** ' + JSON.stringify(x));
    }
    if (x.event == 'open') {
       console.log('***OPENED***');
    }
    if (x.event == 'data') {
        console.log(String(x.data));
        // console.log(nmea.parse(x.data));
    }
}
