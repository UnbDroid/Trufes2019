<template>
  <div class="cards">
    <b-container class="bv-example-row">

      <b-row class="card-row">
        <b-col>
          <zi-card dark>
            <h1>Motors</h1>
          </zi-card>
        </b-col>
      </b-row>

      <b-collapse id="collapse-motors">
        <zi-card hoverable="hoverable" class="card-row">
          <zi-row style="margin-top: 20px; margin-bottom:20px;">
            <zi-col>
              Motor 1
            </zi-col>
            <zi-col>
              <zi-progress class="progress" :percentage="30" color="#f56c6c" :show-text="false">
              </zi-progress>
            </zi-col>
            <zi-col>
              <zi-badge count="0.300" style="margin-left: 10px;"></zi-badge>
            </zi-col>
            <zi-col>
              <zi-tag>FWD</zi-tag>
            </zi-col>
          </zi-row>
        </zi-card>

        <zi-card hoverable="hoverable" class="card-row">
          <zi-row style="margin-top: 20px; margin-bottom:20px;">
            <zi-col>
              Motor 2
            </zi-col>
            <zi-col>
              <zi-progress class="progress" :percentage="30" color="#f56c6c" :show-text="false">
              </zi-progress>
            </zi-col>
            <zi-col>
              <zi-badge count="0.300" style="margin-left: 10px;"></zi-badge>
            </zi-col>
            <zi-col>
              <zi-tag>FWD</zi-tag>
            </zi-col>
          </zi-row>
        </zi-card>

        <zi-card hoverable="hoverable" class="card-row">
          <zi-row style="margin-top: 20px; margin-bottom:20px;">
            <zi-col>
              Motor 3
            </zi-col>
            <zi-col>
              <zi-progress class="progress" :percentage="30" color="#f56c6c" :show-text="false">
              </zi-progress>
            </zi-col>
            <zi-col>
              <zi-badge count="0.300" style="margin-left: 10px;"></zi-badge>
            </zi-col>
            <zi-col>
              <zi-tag>FWD</zi-tag>
            </zi-col>
          </zi-row>
        </zi-card>

        <zi-card hoverable="hoverable" class="card-row">
          <zi-row style="margin-top: 20px; margin-bottom:20px;">
            <zi-col>
              Motor 4
            </zi-col>
            <zi-col>
              <zi-progress class="progress" :percentage="30" color="#f56c6c" :show-text="false">
              </zi-progress>
            </zi-col>
            <zi-col>
              <zi-badge count="0.300" style="margin-left: 10px;"></zi-badge>
            </zi-col>
            <zi-col>
              <zi-tag>FWD</zi-tag>
            </zi-col>
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
.card-row{
  margin-top: 10px;
}
</style>
