import VueRouter from 'vue-router'

import Home from '../components/Home'
import Research from '../components/Research'
import Publications from '../components/Publications'

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
    },
    {
      path: '/publications',
      name: 'publications',
      component: Publications
    }
  ],
  mode: 'history'
})

export default router
