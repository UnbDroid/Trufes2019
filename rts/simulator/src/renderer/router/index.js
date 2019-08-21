import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/screens/Home'
import Control from '@/screens/Control'
import Ladar from '@/screens/Ladar'
import Sensors from '@/screens/Sensors'
import GeneralInfo from '@/screens/GeneralInfo'
import RoundInfo from '@/screens/RoundInfo'
import RoundView from '@/screens/RoundView'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/roundview',
      name: 'RoundView',
      component: RoundView
    },
    {
      path: '/roundinfo',
      name: 'RoundInfo',
      component: RoundInfo
    },
    {
      path: '/generalinfo',
      name: 'GeneralInfo',
      component: GeneralInfo
    },
    {
      path: '/control',
      name: 'Control',
      component: Control
    },
    {
      path: '/ladar',
      name: 'Ladar',
      component: Ladar
    },
    {
      path: '/sensors',
      name: 'Sensors',
      component: Sensors
    }
  ]
})
