<template>
    <div class="home-container">
        <div class="main-content">
            <el-card v-for="item in area1"
            :key="item.name"
            class="main-card"
            >
                <div>区域1 - {{ item.value }}</div>
            </el-card>
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
    padding: 20px;
    gap: 20px;
    min-height: 100vh;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.main-card {
    width: 100%;
}
</style>