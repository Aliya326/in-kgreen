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
      </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useArticleStore } from '@/stores/ArticleList'
import { storeToRefs } from 'pinia'

const value = ref('')
const activeKey = ref([])
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
</style>
