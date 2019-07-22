<template>
  <div v-on:click="updateEncoders" class="cards">
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

  export default {
    name: 'encoders',
    data: () => ({
      value: '',
      enc1: remote.getGlobal('sharedObj').msg_enc1,
      enc2: remote.getGlobal('sharedObj').msg_enc2,
      enc3: remote.getGlobal('sharedObj').msg_enc3,
      enc4: remote.getGlobal('sharedObj').msg_enc4
    }),
    // ready: function () {
    //   setInterval(function () {
    //      this.$data.enc1 = remote.getGlobal('sharedObj').msg_enc1
    //   }, 1000)
    // },
    watch: {
      value(next) {
        console.log('ex-collapse-multiple: ', next)
      }
    },
    methods: {
      updateEncoders: function() {
        this.$data.enc1 = remote.getGlobal('sharedObj').msg_enc1;
        this.$data.enc2 = remote.getGlobal('sharedObj').msg_enc2;
        this.$data.enc3 = remote.getGlobal('sharedObj').msg_enc3;
        this.$data.enc4 = remote.getGlobal('sharedObj').msg_enc4;
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
