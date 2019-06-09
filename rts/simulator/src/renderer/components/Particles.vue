<template>
  <div id='particles-js'></div>
</template>

<script>
export default {
  name: 'particle-js',
  mounted () {
    require('particles.js')
    this.$nextTick(() => {
      this.initParticlesJS()
    })
  },
  methods: {
    initParticlesJS
  }
}
function initParticlesJS () {
  /* eslint-disable */
  particlesJS.load('particles-js','/static/particles.json', function() {
     console.log('callback - particles-js config loaded');
  });
  // particlesJS('particles-js')
}
</script>

<style>
  #particles-js{
    z-index: 10;
    position:absolute;
    width: 100%;
    height: 100%;
    background-color: #fafafa;;
    background-image: url("");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
</style>
