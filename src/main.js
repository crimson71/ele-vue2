import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './config/rem.js'
import './style/comm.scss'
import './icons/index.js'


import Loading from './components/common/Loading.vue'

Vue.config.productionTip = false
Vue.component('LoadingVue',Loading)
new Vue({
  router,
  store,
  strict: process.env.NODE_ENV !== 'production',
  render: h => h(App)
}).$mount('#app')
