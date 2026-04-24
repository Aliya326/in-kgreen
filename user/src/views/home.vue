<template>
 <div class="home-container">
  <div class="home-content">
    <a-card title="Card title" :bordered="false"
    style="margin: 20px;"
    v-for="item in area1"
    :key="item.name"
    >
      {{ item.value }}
    </a-card>
  </div>
    <contan-sidebar/>
</div>
</template>
<script setup>
import { ref } from 'vue'
import contanSidebar from '@/views/contanSidebar.vue'

const area1 = ref([
    {
        name: '1',
        value: '1'
    },
    {
        name: '2',
        value: '2'
    },
    {
        name: '3',
        value: '3'
    },
    {
        name: '4',
        value: '4'
    }
])
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