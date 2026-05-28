<template>
  <div class="search-container">
    <a-list
      item-layout="horizontal"
      :data-source="dataSource"
      :header="headerText"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :description="item.content">
            <template #title>
              <router-link :to="`/atPages/${item.id}`">
                <HighlightText :text="item.title" :keyword="keyword"/>
              </router-link>
            </template>
            <template #avatar>
              <img class="thumb" v-lazy="item.cover_image" alt="thumb" />
            </template>
          </a-list-item-meta>
          <template #extra>
            <a-tag :bordered="false" color="processing">{{item.category}}</a-tag>
          </template>
        </a-list-item>
      </template>
      <template #emptyText>
        <a-empty :description="keyword ? '未匹配到内容' : '请输入关键词进行搜索'" />
      </template>
    </a-list>
    <div v-if="keyword" ref="sentinel" class="load-more">
      <a-spin v-if="isFetchingNextPage" />
      <span v-else-if="!hasNextPage && dataSource.length">没有更多了</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import HighlightText from '@/components/HighlightText.vue'
import { useArticlesInfiniteQuery } from '@/queries/articles'
import { useInfiniteScroll } from '@/utils/useInfiniteScroll'

const route = useRoute()
const keyword = ref((route.query.keyword || '').toString())

const pageSize = computed(() => (keyword.value.trim() ? 20 : 0))
const sentinel = ref(null)
const articlesQuery = useArticlesInfiniteQuery({ pageSize, keyword })

const dataSource = computed(() => {
  if (!keyword.value.trim()) return []
  return articlesQuery.data.value?.pages?.flatMap((p) => p.list) || []
})

const total = computed(() => articlesQuery.data.value?.pages?.[0]?.total || 0)
const hasNextPage = computed(() => articlesQuery.hasNextPage.value)
const isFetchingNextPage = computed(() => articlesQuery.isFetchingNextPage.value)
const headerText = computed(() => {
  if (!keyword.value.trim()) return '搜索结果：（请输入关键词）'
  const loaded = dataSource.value.length
  return `搜索结果：${keyword.value}（已加载 ${loaded}/${total.value || '-'}）`
})

useInfiniteScroll(
  sentinel,
  () => {
    if (!hasNextPage.value || isFetchingNextPage.value) return
    void articlesQuery.fetchNextPage()
  },
  { enabled: () => keyword.value.trim() && hasNextPage.value && !isFetchingNextPage.value }
)

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
.load-more {
  padding: 16px 0;
  display: flex;
  justify-content: center;
  color: var(--text-secondary);
}
</style>
