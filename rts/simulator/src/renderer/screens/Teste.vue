<template>
  <div class="teste">
    <b-container class="bv-example-row">
      <b-row class='spacing'>
        <b-col cols="4">
          <zi-card>
            <h2>a card</h2>
            <br>
          </zi-card>
        </b-col>
        <b-col cols="4">
          <zi-card>
            <h2>a card</h2>
            <br>
          </zi-card>
        </b-col>
        <b-col cols="4">
          <zi-card>
            <h2>a card</h2>
            <br>
          </zi-card>
        </b-col>
      </b-row>

      <b-row class='spacing'>
        <b-col cols="4">
          <zi-card dark>
            <h2>a card</h2>
            <br>
          </zi-card>
        </b-col>
        <b-col cols="4">
          <zi-card dark>
            <h2>a card</h2>
            <br>
          </zi-card>
        </b-col>
        <b-col cols="4">
          <zi-card dark>
            <h2>a card</h2>
            <br>
          </zi-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'teste'
}
</script>

<style lang="css" scoped>

p {
  font-weight: bold;
}

.spacing {
  margin-top: 30px;
}

.teste {
  /* color: #fff; */
  width: 100%;
  z-index: 11;
  /* display: flex; */
  /* background-color: #000000 */
}

</style>
