import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import City from '../views/city/City.vue'
import Msite from '../views/msite/Msite.vue'
// import Login from '../views/login/Login.vue'
// import Profile from '../views/profile/Profile.vue'

const routerPush = VueRouter.prototype.push;
 
VueRouter.prototype.push = function (location) {
 
    return routerPush.call(this, location).catch(err => {})
 

}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: App,
    redirect:'/home',
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
      },
      {
        path: 'msite',
        name:'msite',
        component: Msite,
        // 定义会被 缓存
        meta: { keepAlive: true }
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
