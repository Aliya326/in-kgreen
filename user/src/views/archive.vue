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
        <a-timeline>
            <a-timeline-item v-for="item in filteredAchiveTime" 
            :key="item.time" 
            :datetime="item.time">
                <div class="timeline-title">{{ item.time }} <span class="count-badge">{{ item.count }}</span></div>
                <div v-for="file in filteredArchiveFile" :key="file.id">
                    <p v-if="file.publishDate === item.time">{{ file.title }}</p>
                </div>
            </a-timeline-item>
        </a-timeline>
      </div>
      </div>
</template>

<script setup>
import { ref,computed } from 'vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { useArticleStore } from '@/stores/ArticleList'
import { storeToRefs } from 'pinia'

const value = ref('')
const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)

const filteredArchiveFile = computed(() => {
  if(!value.value || value.value === '') return articleList.value;
  return articleList.value.filter(item => 
    item.publishDate.includes(value.value) || 
    item.title.includes(value.value)
  );
})

const filteredAchiveTime = computed (() =>{
  const source = value.value ? filteredArchiveFile.value : articleList.value;
  const map = new Map();
  source.forEach(item => {
    if (map.has(item.publishDate)) {
      map.get(item.publishDate).count++;
    } else {
      map.set(item.publishDate, { time: item.publishDate, count: 1 });
    }
  });
  return [...map.values()];
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
}

.timeline-title {
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
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