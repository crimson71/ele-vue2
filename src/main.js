import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/rem.js'
import './style/comm.scss'
import './icons/index.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
