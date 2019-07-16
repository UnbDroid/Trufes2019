var io = require('socket.io-client')

var socket = io.connect('http://192.168.8.75:8080');

// The visitor is asked for their username...
var username = "Test";
            
// It's sent with the signal "little_newbie" (to differentiate it from "message")
socket.emit('little_newbie', username);

// A dialog box is displayed when the server sends us a "message"
socket.on('message', function(message) {
  console.log('The server has a message for you: ' + message);
})

// When the button is clicked, a "message" is sent to the server
function sendMsg() {
  console.log("Mandou msg");
  socket.emit('message', 'Hi server, how are you?');
}

setInterval(sendMsg, 1000);
