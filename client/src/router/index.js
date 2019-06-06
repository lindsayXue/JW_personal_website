import VueRouter from 'vue-router'

import Test from '../components/test.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'test',
      component: Test
    }
  ],
  mode: 'history'
})

export default router
