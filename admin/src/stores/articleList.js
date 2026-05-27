import { ref } from 'vue'
import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

export const useArticleListStore = defineStore('articleList', () => {
  const articleList = ref([])

  const getArticleList = async () => {
    try {
      const res = await request.get('/articles/list')
      articleList.value = res
    } catch (error) {
     // console.error('获取数据失败：', error)
    }
  }

  const addArticle = async (formData) => {
    try {
      const res = await request.post('/articles/add', formData)
      articleList.value.push(res)
    } catch (error) {
      //console.error('添加数据失败：', error)
    }
  }

  const deleteArticle = async (id) => {
    try {
      await request.delete(`/articles/${id}`)
      articleList.value = articleList.value.filter(item => item.id !== id)
      ElMessage.success('删除成功')
    } catch (error) {
      //console.error('删除数据失败：', error)
      ElMessage.error('删除失败')
    }
  }
  
  const updateArticle = async (formData) => {
    try {
      await request.put('/articles/update', formData)
      ElMessage.success('更新成功')
    } catch (error) {
     // console.error('更新数据失败：', error)
      ElMessage.error('更新失败')
    }
  }
  return {
    articleList,
    getArticleList,
    addArticle,
    deleteArticle,
    updateArticle
  }
})
export default useArticleListStore
