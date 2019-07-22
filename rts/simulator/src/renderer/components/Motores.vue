<template>
  <div class="cards">
    <b-container class="bv-example-row">

      <b-row class="card-row">
        <b-col>
          <zi-card dark>
            <h1>Motores</h1>
          </zi-card>
        </b-col>
      </b-row>

      <b-collapse id="collapse-motors">
        <zi-card hoverable="hoverable">
          <zi-row style="margin-top: 20px;">
            <zi-col class="first" span="8"><p>Motor 1</p></zi-col>
            <zi-col class="last"><zi-progress percentage="20"></zi-progress></zi-col>
          </zi-row>
        </zi-card>

      </b-collapse>

    </b-container>
    <zi-more v-b-toggle.collapse-motors text="show more" text-up="show less"></zi-more>
  </div>
</template>

<script>
export default {
  name: 'motores',
  data: () => ({
    value1: 9,
    value2: 0.3,
  }),
  watch: {
    value(next) {
      console.log('ex-collapse-motors: ', next)
    },

    value1(val) {
      console.log('first slider`s value: ', val)
    },
    value2(val) {
      console.log('second slider`s value: ', val)
    },
  }
}
</script>

<style lang="css" scoped>
</style>
