import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue'

const http = axios.create({
  timeout: 20000,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  paramsSerializer (params) {
    params._ = Date.now()
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

http.interceptors.request.use(
  function (config) {
    config.url = process.env.VUE_APP_PROXY_PREFIX + config.url
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
http.interceptors.response.use(
  function (response) {
    // 请求错误的处理
    if (
      typeof response.data.code !== 'undefined' &&
      response.data.code !== '0'
    ) {
      // 内部接口走这里（两种接口的error信息不同）
      const msg = response.data.msg || '未知错误！'
      console.error(msg)
      message.error(msg)
      return Promise.reject(msg)
    }

    return Promise.resolve(response.data)
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default http
