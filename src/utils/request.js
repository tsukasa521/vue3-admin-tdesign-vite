import axios from 'axios'
import { useAccountStore } from '@/stores/account'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.BASE_URL, // api的base_url
  timeout: 1000 * 20, // 请求超时时间
  withCredentials: true // 让axios请求header可以传递cookie
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // get请求添加随机数破除缓存
    if (config.method === 'get') {
      const random = 't=' + Date.now()
      if (config.url.indexOf('?') > 0) {
        config.url += '&' + random
      } else {
        config.url += '?' + random
      }
    }

    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    console.debug(`Call API Url: ${config.url}`)

    return config
  },
  (error) => {
    console.error(error)
    Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  (response) => {
    const code = response.data.code
    if (code === 401) {
      showMessage('您已登录超时，为了你的账户安全请重新登陆')
      useAccountStore().logout().then(() => {
        location.reload()
      })
    } else if (code !== 200) {
      showMessage(response.data.msg)
      return Promise.reject(new Error('error'))
    } else {
      return response.data
    }
  },
  (error) => {
    const { response } = error

    console.error(response)
    if (response) {
      // 令牌过期
      if (response.status === 401) {
        showMessage('您已登录超时，为了你的账户安全请重新登陆')
        useAccountStore().logout().then(() => {
          location.reload()
        })
      } else {
        showMessage(response.data)
      }
    }

    return Promise.reject(error)
  }
)

function showMessage (message) {
  alert(message)
}

export default service
