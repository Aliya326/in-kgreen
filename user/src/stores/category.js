import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const useCategoryStore = defineStore('category', () => {
  const categoryListData = ref([])
  const loading = ref(false)
  const loaded = ref(false)

  const fetchData = async (force = false) => {
    if (loaded.value && !force) return
    try {
      loading.value = true
      const res = await request.get('/mock/category.json')
      categoryListData.value = res
      loaded.value = true
    } catch (error) {
      console.error('获取分类数据失败：', error)
    } finally {
      loading.value = false
    }
  }

  return {
    categoryListData,
    loading,
    loaded,
    fetchData,
  }
})

export default useCategoryStore
