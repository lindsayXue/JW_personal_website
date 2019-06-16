import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { theme } from './style/theme'
import VueRouter from 'vue-router'
import router from './router'
import App from './App.vue'
import store from './store'
import { sync } from 'vuex-router-sync'

import './stylus/main.styl'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme,
  options: {
    customProperties: true
  }
})
Vue.use(VueRouter)
Vue.use(require('vue-moment'))

sync(store, router)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
