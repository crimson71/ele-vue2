import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import City from '../views/city/City.vue'
// import Login from '../views/login/Login.vue'
// import Profile from '../views/profile/Profile.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,

    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: 'city/:cityid',
        name: 'city',
        component: City
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
