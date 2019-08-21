<template>
  <div class="c_holder">
    <pid></pid>
    <motores></motores>
    <encoders></encoders>
  </div>
</template>

<script>
import Motores from '@/components/Motores'
import Encoders from '@/components/Encoders'
import PID from '@/components/PID'

export default {
  name: 'control',
  components: {
    'encoders': Encoders,
    'motores': Motores,
    'pid': PID
  }
}
</script>


<style lang="css" scoped>

.c_holder {
  width: 100%;
}

</style>
