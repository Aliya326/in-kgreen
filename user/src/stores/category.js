import { defineStore } from 'pinia'
import { ref } from 'vue'
import request from '@/utils/request'

export const useCategoryStore = defineStore('category', () => {
  const categoryListData = ref([])
  const loading = ref(false)
  const loaded = ref(false)
  const inflight = null

  const fetchData = async (force = false) => {
    if (loaded.value && !force) return Promise.resolve(categoryListData.value)
    if (inflight && !force) return inflight
    inflight = (async () => {
      try {
      loading.value = true
      const res = await request.get('/categories/list')
      console.log('categoryListData', res)
      categoryListData.value = res
      loaded.value = true
      return res
    } finally {
      loading.value = false
      inflight = null
    }
  })()
  return inflight
}

  return {
    categoryListData,
    loading,
    loaded,
    fetchData,
  }
})

export default useCategoryStore
