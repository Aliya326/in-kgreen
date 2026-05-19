<script setup>
import { onMounted } from 'vue'
import { useArticleListStore } from '@/stores/articleList'
import { useCategoryStore } from '@/stores/category'

const articleListStore = useArticleListStore()
const categoryStore = useCategoryStore()

onMounted(() => {
    articleListStore.getArticleList()
    categoryStore.getCategoryList()
})
</script>

<template>
  <div>
    <router-view />
  </div>
</template>
