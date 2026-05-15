<template>
    <div class="page-container">
      <div class="container">
        <div class="title-row">
          <div class="title-left">Article archiving</div>
          <div class="title-right">归档</div>
          <a-input
            v-model:value="value"
            placeholder="请输入搜索内容（日期或标题）"
            size="default"
            class="search-bar"
            allowClear
          >
          <template #addonBefore>
            <SearchOutlined />
          </template>
        </a-input>
        </div>
        <a-empty v-if="grouped.length === 0" description="没有匹配到内容" />
        <a-timeline v-else>
          <a-timeline-item
            v-for="group in grouped"
            :key="group.time"
            :datetime="group.time"
          >
            <div class="timeline-title">
              {{ group.time }}
              <span class="count-badge">{{ group.items.length }}</span>
            </div>
            <router-link
              v-for="file in group.items"
              :key="file.id"
              class="archive-link"
              :to="`/atPages/${file.id}`"
            >
              {{ file.title }}
            </router-link>
          </a-timeline-item>
        </a-timeline>
      </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useArticleStore } from '@/stores/ArticleList'
import { storeToRefs } from 'pinia'

const value = ref('')
const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)

const filteredList = computed(() => {
  const kw = value.value.trim()
  if (!kw) return articleList.value
  return articleList.value.filter(
    (item) =>
      (item.publishDate || '').includes(kw) ||
      (item.title || '').includes(kw)
  )
})

// 按 publishDate 分组并倒序
const grouped = computed(() => {
  const map = new Map()
  filteredList.value.forEach((item) => {
    const key = item.publishDate || '未知日期'
    if (!map.has(key)) map.set(key, { time: key, items: [] })
    map.get(key).items.push(item)
  })
  return [...map.values()].sort((a, b) => (a.time < b.time ? 1 : -1))
})
</script>

<style scoped>
.page-container {
  padding-top: 66px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 24px 0;
  padding: 0 24px;
}

.title-left {
  font-size: 24px;
  font-weight: bold;
}

.search-bar {
  width: 240px;
  margin-left: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.timeline-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.archive-link {
  display: block;
  padding: 4px 0;
  color: var(--text-secondary);
  text-decoration: none;
}
.archive-link:hover {
  color: var(--color-badge);
}

.count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-inverse);
  background-color: var(--color-badge);
  border-radius: 10px;
}
</style>
