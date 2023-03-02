import request from '../config/request.js'

// 获取城市定位
export const guessCity = (params) => {
  return request({
    method: 'get',
    url: 'v1/cities',
    data: params
  })
}
// 获取当前城市
export const currentCity = (params) => {
  return request({
    method: 'get',
    url: `v1/cities/${params.id}`

  })
}
// 获取搜索地址
export const posiSearch = (params) => {
  return request({
    method: 'get',
    url: 'v1/pois',
    data: params
  })
}
