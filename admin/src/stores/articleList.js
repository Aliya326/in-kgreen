import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/utils/request'

export const useArticleListStore = defineStore('articleList', () => {
  const articleList = ref([])

  const getArticleList = async () => {
    try {
      const res = await request.get('/articles/list')
      articleList.value = res
    } catch (error) {
      console.error('获取数据失败：', error)
    }
  }

  const addArticle = async (formData) => {
    try {
      const res = await request.post('/articles/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      articleList.value.push(res)
    } catch (error) {
      console.error('添加数据失败：', error)
    }
  }
  return {
    articleList,
    getArticleList,
    addArticle
  }
})
export default useArticleListStore
