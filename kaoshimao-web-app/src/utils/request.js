import axios from 'axios'
import { Message,Loading } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'
// create an axios instance
import router from '../router/index';
const service = axios.create({
  timeout: 5000, // request timeout
  baseURL: process.env.VUE_APP_URL,
})
// let loading = null
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
service.interceptors.request.use(config => {
  // loading = Loading.service({
  //   lock: true,
  //   spinner: 'el-icon-loading',
  // });
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== '200') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 2 * 1000
      })
      if (res.code === '999' || res.code === 50012 || res.code === 50014) {
        router.push('/login')
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
