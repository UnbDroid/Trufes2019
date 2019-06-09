<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
  import Home from '@/screens/Home'

  export default {
    name: 'trufesim',
    components: {
      Home
    }
  }
</script>

<style>

div {
  display: block;
}

body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Avenir,PingFang SC,Helvetica Neue,Helvetica;
    color: #000;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-size: 1rem;
    line-height: 1.7;
    margin: 0;
    padding: 0;
}

</style>
