<template>
  <div class="c_holder">
    <ldr></ldr>
  </div>
</template>

<script>
import LDR from '@/components/LDR'

export default {
  name: 'sensors',
  components: {
      'ldr': LDR
  }
}
</script>

<style lang="css" scoped>
.c_holder {
  width: 100%;
}
</style>
