import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)
const state = {
  // 控制loading图标
  showLoading:true,
  userInfo: null ,// 用户信息
  geohash:'31.22299,121.36025',//地址地理信息
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions

}
)
