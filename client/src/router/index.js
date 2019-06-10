import VueRouter from 'vue-router'

import Home from '../components/Home'
import Research from '../components/Research'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/research',
      name: 'research',
      component: Research
    }
  ],
  mode: 'history'
})

export default router
