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
        <a-collapse v-else v-model:activeKey="activeKey" class="archive-collapse">
          <a-collapse-panel v-for="group in grouped" :key="group.time">
            <template #header>
              <div class="panel-header">
                <span class="panel-title">{{ group.time }}</span>
                <span class="count-badge">{{ group.items.length }}</span>
              </div>
            </template>
            <a-list :data-source="group.items" item-layout="horizontal" class="archive-list">
              <template #renderItem="{ item }">
                <a-list-item>
                  <router-link class="archive-link" :to="`/atPages/${item.id}`">
                    <span class="item-date">{{ item.publishDate || '未知日期' }}</span>
                    <span class="item-title">{{ item.title }}</span>
                  </router-link>
                </a-list-item>
              </template>
            </a-list>
          </a-collapse-panel>
        </a-collapse>
        <div ref="sentinel" class="load-more">
          <a-spin v-if="isFetchingNextPage" />
          <span v-else-if="articleList.length">已加载 {{ articleList.length }}/{{ total || '-' }}</span>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useArticlesInfiniteQuery } from '@/queries/articles'
import { useInfiniteScroll } from '@/utils/useInfiniteScroll'

const value = ref('')
const activeKey = ref([])
const sentinel = ref(null)
const month = computed(() => {
  const kw = value.value.trim()
  if (!kw) return ''
  const m = kw.match(/^(\d{4}-\d{2})(?:-\d{2})?$/)
  return m ? m[1] : ''
})
const keyword = computed(() => {
  const kw = value.value.trim()
  if (!kw) return ''
  if (/^(\d{4}-\d{2})(?:-\d{2})?$/.test(kw)) return ''
  return kw
})

const articlesQuery = useArticlesInfiniteQuery({ pageSize: 30, keyword, month })
const articleList = computed(() => articlesQuery.data.value?.pages?.flatMap((p) => p.list) || [])
const total = computed(() => articlesQuery.data.value?.pages?.[0]?.total || 0)
const hasNextPage = computed(() => articlesQuery.hasNextPage.value)
const isFetchingNextPage = computed(() => articlesQuery.isFetchingNextPage.value)

// 按 publishDate 分组并倒序
const grouped = computed(() => {
  const map = new Map()
  articleList.value.forEach((item) => {
    const date = (item.publishDate || '').toString()
    const key = date ? date.slice(0, 7) : '未知日期'
    if (!map.has(key)) map.set(key, { time: key, items: [] })
    map.get(key).items.push(item)
  })
  const groups = [...map.values()].map((group) => {
    return {
      ...group,
      items: group.items.sort((a, b) => ((a.publishDate || '') < (b.publishDate || '') ? 1 : -1)),
    }
  })
  return groups.sort((a, b) => {
    if (a.time === '未知日期') return 1
    if (b.time === '未知日期') return -1
    return a.time < b.time ? 1 : -1
  })
})

watch(
  grouped,
  (val) => {
    if (activeKey.value.length === 0 && val.length > 0) activeKey.value = [val[0].time]
  },
  { immediate: true }
)

useInfiniteScroll(
  sentinel,
  () => {
    if (!hasNextPage.value || isFetchingNextPage.value) return
    void articlesQuery.fetchNextPage()
  },
  { enabled: () => hasNextPage.value && !isFetchingNextPage.value }
)
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

.archive-collapse :deep(.ant-collapse-item) {
  border: none;
}

.archive-collapse :deep(.ant-collapse-header) {
  padding: 12px 0;
}

.archive-collapse :deep(.ant-collapse-content-box) {
  padding: 0 0 12px;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.panel-title {
  font-size: 16px;
  font-weight: 600;
}

.archive-link {
  display: flex;
  align-items: baseline;
  gap: 12px;
  width: 100%;
  color: var(--text-secondary);
  text-decoration: none;
}
.archive-link:hover {
  color: var(--color-badge);
}

.item-date {
  flex: 0 0 auto;
  font-size: 12px;
  color: var(--text-secondary);
}

.item-title {
  flex: 1;
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
.load-more {
  padding: 16px 0;
  display: flex;
  justify-content: center;
  color: var(--text-secondary);
}
</style>
