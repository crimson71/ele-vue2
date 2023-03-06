import axios from 'axios'
// import { baseUrl } from './index.js'

const baseUrl = 'https://elm.cangdu.org'

const service = axios.create({
  baseURL: baseUrl
})
export default function request (options) {
  
  options.method = options.method || 'GET'
  if (options.method.toUpperCase() === 'GET') {
    // get方法传参
    options.params = options.data
  }
  return service(options)
}
