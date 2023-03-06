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
// 获取msite页面地址信息
export const msiteAddress = (params) => {
  return request({
    method:'get',
    url:'v2/pois/'+params,
    
  })

}
// 获取店铺导航分类
export const msiteFoodType = (geohash) => {
  return request({
    method: 'get',
    url: 'v2/index_entry',
    geohash,
    group_type: '1',
    'flags[]': 'F'
  })
}

export const shopList = (params) => {
  return request({
    method:'get',
    url:'shopping/restaurants'+'',
    data:params

  })
}
