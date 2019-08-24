<template>
  <div class="cards">
    <b-container class="bv-example-row">

      <b-row class="card-row">
        <b-col>
          <zi-card dark>
            <h1>Encoders</h1>
          </zi-card>
        </b-col>
      </b-row>

      <b-collapse id="collapse-encoders">
        <b-row class="card-row">

          <b-col>
            <zi-card>
              <h2>Encoder 1</h2>
              <br>
              <p>{{enc1}} Rotações</p>
            </zi-card>
          </b-col>

          <b-col>
            <zi-card>
              <h2>Encoder 2</h2>
              <br>
              <p>{{enc2}} Rotações</p>
            </zi-card>
          </b-col>

        </b-row>

        <b-row class="card-row">

          <b-col>
            <zi-card>
              <h2>Encoder 3</h2>
              <br>
              <p>{{enc3}} Rotações</p>
            </zi-card>
          </b-col>

          <b-col>
            <zi-card>
              <h2>Encoder 4</h2>
              <br>
              <p>{{enc4}} Rotações</p>
            </zi-card>
          </b-col>

        </b-row>
      </b-collapse>
    </b-container>
    <zi-more v-b-toggle.collapse-encoders text="show more" text-up="show less"></zi-more>
  </div>
</template>

<script>
  var remote = require('electron').remote;
  var http = require('http');
  var server = http.createServer();
  var io = require('socket.io').listen(server);

  export default {
    name: 'encoders',
    data: () => ({
      value: '',
      enc1: 0,
      enc2: 0,
      enc3: 0,
      enc4: 0
    }),
    watch: {
      value(next) {
        console.log('ex-collapse-multiple: ', next)
      }
    },
    created() {
      var self = this
      io.sockets.on('connection', function (socket) {
        // When the client connects, they are sent a message
        socket.emit('message', 'You are connected!');
        // When a "message" is received (click on the button), it's logged in the console
        socket.on('encoders', function (enc1, enc2, enc3, enc4) {
          console.log("Entrou aqui 3")
          self.updateEncoders(enc1, enc2, enc3, enc4)
          console.log(enc1, enc2, enc3, enc4)
          // The username of the person who clicked is retrieved from the session variables
        });
      });
      server.listen(8080);
    },
    methods: {
      updateEncoders(enc1, enc2, enc3, enc4) {
        this.enc1 = enc1
        this.enc2 = enc2
        this.enc3 = enc3
        this.enc4 = enc4
      }
    }
  }
</script>

<style lang="css" scoped>

  .cards {
    width: 100%;
    z-index: 11;
  }

  .card-row{
    margin-top: 30px;
  }
</style>
