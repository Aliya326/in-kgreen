import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const useArticleStore = defineStore('article', () => {
  const articleList = ref([])
  const loading = ref(false)
  const loaded = ref(false)
  const inflight = null

const fetchData = async (force = false) => {
  // 如果数据已经加载过，并且没有强制刷新的要求，直接返回缓存的数据
  // loaded.value 是一个响应式变量（可能是 Vue 的 ref 或 reactive），标记数据是否已加载
  if (loaded.value && !force) return Promise.resolve(articleList.value)
  
  // 如果当前有一个正在进行的请求，并且没有强制刷新，则返回那个正在进行的 Promise
  // 这样做避免重复请求，多个调用者可以共享同一个 Promise 实例
  if (inflight && !force) return inflight
  
  // 创建一个新的异步请求，并将这个 Promise 赋值给 inflight 变量，用于后续的去重判断
  inflight = (async () => {
    try {
      // 开始加载，将 loading 状态设置为 true，用于显示加载中的 UI 效果
      loading.value = true
      
      // 发起实际的网络请求，从 '/articles/list' 接口获取文章列表数据
      const res = await request.get('/articles/list')
      
      // 请求成功，将返回的数据更新到 articleList 中，articleList 也是响应式数据
      articleList.value = res
      
      // 标记数据已经加载完成
      loaded.value = true
      
      // 返回获取到的数据，供调用者使用
      return res
    } finally {
      // 无论请求成功还是失败，最终都要执行的清理工作
      // 关闭 loading 加载状态
      loading.value = false
      
      // 清空 inflight 变量，表示当前没有正在进行的请求
      // 这样下一次调用时如果数据未加载或需要强制刷新，可以发起新请求
      inflight = null
    }
  })()
  
  // 返回刚刚创建的这个请求的 Promise，调用者可以通过 await 得到结果
  return inflight
}

  return {
    articleList,
    loading,
    loaded,
    fetchData,
  }
})

export default useArticleStore
