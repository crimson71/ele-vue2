
export default {
  //vuex试验用
  handleLoading(state,loadingVal) {
    state.showLoading = loadingVal
    console.log(state.showLoading);
  },

//记录经纬度
RECORD_ADDRESS(state,{
  latitude,
  longitude
}) {
  state.latitude = latitude
  state.longitude = longitude

}

}