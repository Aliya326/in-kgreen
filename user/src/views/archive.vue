<template>
    <div class="page-container">
      <a-input
        v-model="value"
        placeholder="input search text"
        size="small"
        class="search-bar"
        style="width: 300px;"
      />
      <div class="container">
        <h2 class="title-row">
          <div class="title-left">Article archiving</div>
          <div class="title-right">文章归档</div>
        </h2>
        <a-collapse>
            <a-collapse-panel v-for="item in archiveTime" :key="item" :header="item">
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

</script>

<style scoped>
.page-container {
  padding-top: 66px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>