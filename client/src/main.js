import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { theme } from './style/theme'
import VueRouter from 'vue-router'
import router from './router'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Vuetify, { theme })
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
