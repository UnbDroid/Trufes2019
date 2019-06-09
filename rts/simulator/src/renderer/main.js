import Vue from 'vue'
import axios from 'axios'
import router from './router'
import ZeitUI from '@zeit-ui/vue'
import '@zeit-ui/vue/dist/zeit-ui.css'
import App from './App'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue)


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(ZeitUI)

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
