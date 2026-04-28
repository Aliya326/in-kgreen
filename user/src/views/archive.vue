<template>
    <div class="page-container">
      <div class="container">
        <div class="title-row">
          <div class="title-left">Article archiving</div>
          <div class="title-right">文章归档</div>
          <a-input
            v-model:value="value"
            placeholder="请输入搜索内容（日期或标题）"
            size="small"
            class="search-bar"
          />
        </div>
        <a-collapse>
            <a-collapse-panel v-for="item in filteredAechiveTime" :key="item" :header="item">
                <template v-for="file in filteredArchiveFile" :key="file.id">
                    <p v-if="file.time === item"> {{ file.title }} </p>
                </template>
            </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
</template>

<script setup>
import { ref,computed } from 'vue'

const value = ref('')
const archiveFile = ref([
    {
        id: 1,
        time: '2026-1',
        title:"第一个"
    },
    {
        id:4,
        time: '2026-1',
        title:"第四个"

    },
    {
        id: 2,
        time: '2026-2',
        title:"第二个"
    },
    {
        id: 3,
        time: '2026-3',
        title:"第三个"
    },
])

const archiveTime = ref([
    '2026-1',
    '2026-2',
    '2026-3',
])

const filteredArchiveFile = computed(() => {
  if(!value.value) return archiveFile.value;
  return archiveFile.value.filter(item => 
    item.time.includes(value.value) || 
    item.title.includes(value.value)
  );
})

const filteredAechiveTime = computed (() =>{
  if(!value.value) return archiveTime.value;
  const times = filteredArchiveFile.value.map(item => item.time);
  return [...new Set(times)]
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

.title-right {
  font-size: 24px;
  font-weight: bold;
  flex: 1;
}

.search-bar {
  width: 240px;
  margin-left: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>