<template>
  <div class="ex-side-shim">
    <div class="ex-side">
      <div class="bar">
        <i class="zi-icon-menu"></i>
      </div>
      <div class="bar-bg"></div>

      <p class="zi-title">Dashboard</p>
      <ul>
        <li>
          <router-link v-bind:to="'/teste'">round view</router-link>
        </li>
        <li >
          <router-link v-bind:to="'/second'" class="">round info</router-link>
        </li>
      </ul>

      <p class="zi-title">modules</p>

      <ul>

        <li>
          <router-link v-bind:to="'/generalinfo'" class="">general info</router-link>
        </li>

        <li>
          <router-link v-bind:to="'/control'">control</router-link>
        </li>

        <li>
          <router-link v-bind:to="'/ladar'" class="">ladar</router-link>
        </li>

        <li>
          <router-link v-bind:to="'/sensors'" class="">sensors</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'nav-bar'
  }
</script>

<style media="screen">

.ex-side-shim {
  z-index: 12;
  background-color: #fafafa;
  display: flex;
  min-width: 200px;
  max-width: 300px;
}

.ex-side li {
  list-style: none;
}

.router-link-active {
  font-weight: 700;
}

ul>li:before {
  content: none !important;
}

ul {
  margin: 0 !important;
}

li {
  display: list-item;
  text-align: -webkit-match-parent;
  font-size: 1rem;
  line-height: 1.714285714285714rem;

}

.ex-side {
  background-color: #ffffff;
  width: 185px;
  overflow-y: auto;
  overflow-x: hidden;
  text-transform: capitalize;
  height: 100vh;
  padding-bottom: 30px;
  top: 0;
  padding-left: 30px;
  padding-top: 80px;
}

.ex-side a {
  color: #000;
  font-size: 14px;
}

</style>
