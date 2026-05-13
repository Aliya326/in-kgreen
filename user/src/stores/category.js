import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
    const categoryListData = ref([])
    const loading = ref(true)
    const fetchData = async () => {
        try {
            loading.value = true
            const res = await request.get('/mock/category.json')
            categoryListData.value = res
            loading.value = false
        } catch (error) {
            console.error('获取数据失败：', error)
            loading.value = false
        }
    }
    
    fetchData()

    return {
        categoryListData,
        loading,
        fetchData
    }
})
export default useCategoryStore