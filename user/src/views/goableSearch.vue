<template>
  <div class="search-container">
    <a-list
      item-layout="horizontal"
      :data-source="dataSource"
      :header="`搜索结果：${keyword || '（请输入关键词）'}`"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.content">
            <template #title>
              <router-link :to="`/atPages/${item.id}`">
                <HighlightText :text="item.title" :keyword="keyword" />
              </router-link>
            </template>
            <template #avatar>
              <img class="thumb" :src="item.cover_image" alt="thumb" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
      <template #emptyText>
        <a-empty :description="keyword ? '未匹配到内容' : '请输入关键词进行搜索'" />
      </template>
    </a-list>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/ArticleList'
import HighlightText from '@/components/HighlightText.vue'

const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)

const route = useRoute()
const keyword = ref((route.query.keyword || '').toString())

const dataSource = computed(() => {
  const kw = keyword.value.trim()
  if (!kw) return []
  return articleList.value.filter((item) => {
    return (
      (item.title || '').includes(kw) ||
      (item.content || '').includes(kw) ||
      (item.intro_md || '').includes(kw) ||
      (item.category || '').includes(kw)
    )
  })
})

watch(
  () => route.query.keyword,
  (newVal) => {
    keyword.value = (newVal || '').toString()
  }
)
</script>

<style scoped>
.search-container {
  padding: 20px;
  margin: 68px auto 0;
  width: 60%;
  max-width: 900px;
}
.thumb {
  width: 80px;
  height: 56px;
  object-fit: cover;
  border-radius: 6px;
}
</style>
