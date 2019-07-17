<template>
  <div class="placeholder">
    <router-view class="router"></router-view>
  </div>
</template>

<script>
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vue from 'vue'

Vue.use(BootstrapVue)

export default {
  name: 'placeholder'
}
</script>

<style lang="css" scoped>

.placeholder {
  /* pointer-events: none; */
  z-index: 11;
  display: flex;
  padding: 50px 50px 0px 50px;
  width: 100%;
}


</style>
