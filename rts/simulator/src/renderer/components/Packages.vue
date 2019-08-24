<template>
  <b-container class="bv-example-row">

    <b-row class="card-row">
      <b-col>
        <zi-card dark>
          <h1>Light Dependent Resistor</h1>
        </zi-card>
      </b-col>
    </b-row>

    <b-collapse id="collapse-ldr">

      <b-row class="card-row">
        <b-col>
          <zi-fieldset footer="Color">
            <h1>Front LDR</h1>
            <p>The Evil Rabbit Jumped over the Fence</p>
          </zi-fieldset>
        </b-col>
        <b-col>
          <zi-fieldset footer="Color">
            <h1>Left LDR</h1>
            <p>The Evil Rabbit Jumped over the Fence</p>
          </zi-fieldset>
        </b-col>
      </b-row>

      <b-row class="card-row">
        <b-col>
          <zi-fieldset footer="Color ">
            <h1>Right LDR</h1>
            <p>The Evil Rabbit Jumped over the Fence</p>
          </zi-fieldset>
        </b-col>
        <b-col>
          <zi-fieldset footer="Color ">
            <h1>Claw LDR</h1>
            <p>The Evil Rabbit Jumped over the Fence</p>
          </zi-fieldset>
        </b-col>
      </b-row>

    </b-collapse>
  </b-container>
  <zi-more v-b-toggle.collapse-packages text="show more" text-up="show less"></zi-more>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
</style>
