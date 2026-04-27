import axios from 'axios'

const service = axios.create({
    baseURL: '',  // 后续替换为你的后端 API 地址
    timeout: 10000
})

// 请求拦截器（可在此添加 token 等鉴权信息）
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.error('请求错误：', error)
        return Promise.reject(error)
    }
)

// 响应拦截器（自动解包 response.data，统一错误处理）
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.error('响应错误：', error)
        return Promise.reject(error)
    }
)

export default service
