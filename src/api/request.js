import axios from 'axios'
import { ElMessage } from 'element-plus'
import config from '@/config'
// 创建一个axios实例
const service = axios.create({
  baseURL: config.baseApi, // 设置基础URL
  timeout: 5000, // 设置请求超时时间
})

const NETWORK_ERROR = '网络错误...'

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 可以在这里添加请求头、处理请求参数等
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use((res) => {
  const { code, data, msg } = res.data
  if (code === 200) {
    return data
  } else {
    const NETWORK_ERROR = '网络错误...'
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

function request(options) {
  options.method = options.method || 'get'
  // 关于get请求和post请求参数调整
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  // 对mock的开关做一个处理
  let isMock = config.mock
  if (typeof options.mock != 'undefined') {
    isMock = options.mock
  }

  //针对环境做一个处理
  if (config.env === 'prod') {
    // 不能用mock
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options)
}

export default request
