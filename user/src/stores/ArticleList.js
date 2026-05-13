import { defineStore } from 'pinia'
import request from '@/utils/request'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
    const articleList = ref([])
    const loading = ref(true)
    const category = ref("")
    const fetchData = async () => {
        try {
            loading.value = true
            const res = await request.get('/mock/article.json')
            articleList.value = res
            loading.value = false
        } catch (error) {
            console.error('获取数据失败：', error)
            loading.value = false
        }
    }
    
    fetchData()

    return {
        articleList,
        loading,
        category,
        fetchData
    }
})

export default useArticleStore
