<template>
 <div class="home-container">
  <div class="home-content">
    <a-card :bordered="false"
    style="margin: 20px;"
    v-for="item in area1"
    :key="item.name"
    :title="item.title"
    >
      {{ item.value }}
    </a-card>
  </div>
    <contan-sidebar/>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import contanSidebar from '@/views/contanSidebar.vue'
import request from '@/utils/request'

const area1 = ref([])
const fetchData = async () => {
    try {
        const res = await request.get('/mock/area1.json')
        area1.value = res
    } catch (error) {
        console.error('获取数据失败：', error)
    }
}

onMounted(() => {
    fetchData()
})

</script>
<style scoped>
.home-container {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 66px 20px 20px;
    gap: 20px;
    height: calc(100vh - 66px);
    box-sizing: border-box;
    overflow: hidden;
}

.home-content {
    flex: 3;
    min-width: 0;
    overflow-y: auto;
    height: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.home-content::-webkit-scrollbar {
    display: none;
}
</style>