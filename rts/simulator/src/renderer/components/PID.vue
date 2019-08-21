<template>
  <div class="">
    <b-container class="bv-example-row">

      <b-row class="card-row">
        <b-col>
          <zi-card dark>
            <h1>PID Control</h1>
          </zi-card>
        </b-col>
      </b-row>

      <b-collapse id="collapse-pid">

        <b-row class="card-row">
          <b-col>
            <zi-fieldset footer="Color ">
              <h1>Right LDR</h1>
              <p>The Evil Rabbit Jumped over the Fence</p>
            </zi-fieldset>
          </b-col>
          <b-col>
            <zi-fieldset footer="Kp = 10; Ki = 5; Kd = 7">
              <h1>Control</h1>
              <h3>Adjust</h3>
              <h3>Proportional</h3>
              <h3>Integral</h3>
              <h3>Derivate</h3>
            </zi-fieldset>
          </b-col>

        </b-row>

        <b-row class="card-row">
          <b-col>
            <zi-fieldset footer="Color">
              <h1>Encoders</h1>
              <h3>Left-Top</h3>
              <h3>Left-Bot</h3>
              <h3>Right-Top</h3>
              <h3>Right-Bot</h3>
            </zi-fieldset>
          </b-col>

          <b-col>
            <zi-fieldset footer="">
              <h1>Errors</h1>
              <h3>Left-Error</h3>
              <h3>Right-Error</h3>
              <h3>Total Error</h3>
            </zi-fieldset>
          </b-col>

        </b-row>

      </b-collapse>
    </b-container>
    <zi-more v-b-toggle.collapse-pid text="show more" text-up="show less"></zi-more>
  </div>
</template>

<script>
export default {
  name: 'pid',
  watch: {
    value(next) {
      console.log('ex-collapse-multiple: ', next)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
