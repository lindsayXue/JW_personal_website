import VueRouter from 'vue-router'

import Home from '../components/Home/Home'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ],
  mode: 'history'
})

export default router
