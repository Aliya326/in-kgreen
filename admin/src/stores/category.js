import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])

  const getCategoryList = async () => {
    try {
      const res = await request.get('/categories/list')
      categoryList.value = res
    } catch (error) {
      console.error('获取数据失败：', error)
    }
  }

   const deleteCategory = async (id) => {
    try {
      await request.delete(`/categories/${id}`)
      await getCategoryList()
    } catch (error) {
      console.error('删除数据失败：', error)
    }
  }

  const addCategory = async (form) => {
    try {
      await request.post('/categories/add', form)
      await getCategoryList()
    } catch (error) {
      console.error(error.response.data)
    }
  }

  return {
    categoryList,
    getCategoryList,
    deleteCategory,
    addCategory
  }
})
export default useCategoryStore
