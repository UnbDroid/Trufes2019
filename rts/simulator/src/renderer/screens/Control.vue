<template>
  <div class="c_holder">
    <motores></motores>
    <encoders></encoders>
  </div>
</template>

// <script>
import Motores from '@/components/Motores'
import Encoders from '@/components/Encoders'

export default {
  name: 'control',
  components: {
    'encoders': Encoders,
    'motores': Motores
  }
}
</script>


<style lang="css" scoped>

.c_holder {
  width: 100%;
}

</style>
