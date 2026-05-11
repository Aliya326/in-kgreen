<template>
    <div class="page-wrapper">
      <div class="main-content">
        <a-row :gutter="[12, 12]">
          <a-col :span="8" v-for="item in area1" :key="item.id">
            <a-card class="card" :loading="loading">
              <template #cover>
                  <a-image :src="item.cover_image" :preview="false"/>
              </template>
              <p>{{ item.title }}</p>
              <template #actions>
                  <a-tag color="processing">{{ item.category }}</a-tag>
              </template>
            </a-card>
          </a-col>
        </a-row>
      </div>
      <div class="sidebar">
        <container/>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import container from '@/components/contanSidebar.vue'
import request from '@/utils/request'

const area1 = ref([])
const loading = ref(true)
const fetchData = async () => {
    try {
        loading.value = true
        const res = await request.get('/mock/area1.json')
        area1.value = res
        loading.value = false
    } catch (error) {
        console.error('获取数据失败：', error)
        loading.value = false
    }
}

onMounted(() => {
    fetchData()
})

</script>
<style scoped>
.page-wrapper {
    display: flex;
    gap: 20px;
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
    margin-top: 250px;
}
.main-content {
    flex: 1;
    min-width: 0;
}
.card {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>