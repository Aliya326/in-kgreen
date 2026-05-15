import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const useArticleStore = defineStore('article', () => {
  const articleList = ref([])
  const loading = ref(false)
  const loaded = ref(false)
  const category = ref('')

  const fetchData = async (force = false) => {
    if (loaded.value && !force) return
    try {
      loading.value = true
      const res = await request.get('/mock/article.json')
      articleList.value = res
      loaded.value = true
    } catch (error) {
      console.error('获取文章数据失败：', error)
    } finally {
      loading.value = false
    }
  }

  return {
    articleList,
    loading,
    loaded,
    category,
    fetchData,
  }
})

export default useArticleStore
