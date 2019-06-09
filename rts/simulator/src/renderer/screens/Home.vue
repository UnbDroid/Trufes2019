<template>
  <div class="zi-main zi-layout ex-layout">
    <particle-js></particle-js>
    <nav-bar></nav-bar>
    <placeholder></placeholder>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import Particles from '@/components/Particles'
import Placeholder from '@/screens/Placeholder'

export default {
  name: 'home',
  components: {
    'nav-bar': NavBar,
    'particle-js': Particles,
    'placeholder': Placeholder
  }
}
</script>

<style lang="css" scoped>

@media screen and (max-width: 1440px) and (min-width: 959px){
  .zi-layout {
      width: 100% !important;
      padding: 0;
      max-width: 100%;
    }
}

@media screen and (max-width: 1920px) and (min-width: 1440px){
  .zi-layout {
      width: 100% !important;
      padding: 0;
      max-width: 100%;
  }
}

.zi-main {
    background-color: #fafafa;
    min-height: 100%;
}

.zi-layout {
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
}

.ex-layout {
    display: flex;
    margin: 0;
}

</style>
