import axios from 'axios'
import conf from '@/conf/index'
import {areaAdvt} from './areaAdvt'
import {co} from './co'
import {advt} from './advt'
import {rdtlarea} from './rdtlarea'
import {setting} from './setting'
var instance = axios.create({
  baseURL: conf.URL
})

// instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN'

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('axios response', response)
  return response
}, function (error) {
  // 对响应错误做点什么
  console.warn('(tag)', error.response.data)
  let message = error.response.data.message
  return Promise.reject(new Error(message))
})

export const http = {
  get (url) {
    console.log(process.env.NODE_ENV)
    return instance.get(url)
  },
  post (url, data) {
    return instance.post(url, data)
  },
  delete (url) {
    return instance.delete(url)
  },
  put (url, data) {
    return instance.put(url, data)
  }
}

export {areaAdvt, co, advt, rdtlarea, setting}
