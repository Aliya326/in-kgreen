<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useArticleStore } from '@/stores/ArticleList'
import { useCategoryStore } from '@/stores/category'

useThemeStore()
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()

onMounted(() => {
  articleStore.fetchData()
  categoryStore.fetchData()
})
</script>

<style></style>
