import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/screens/Home'
import Teste from '@/screens/Teste'
import Second from '@/screens/Second'
import Control from '@/screens/Control'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/teste',
      name: 'Teste',
      component: Teste
    },
    {
      path: '/control',
      name: 'Control',
      component: Control
    },
  ]
})
