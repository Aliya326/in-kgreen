<template>
      <a-card class="header" :title="data.title">
        <div class="header-content">
            <img :src="data.cover_image"/>
            <span>{{ data.content }}</span>
        </div>
      </a-card>
      <a-card class="introduction" title="简介">
        <p>asdsadsad</p>
      </a-card>
      <a-card class="download" title="下载">
        <p>sadsadsads</p>
      </a-card>
</template>
<script  setup>
import { ref,computed,onMounted } from 'vue'
import { useRoute } from 'vue-router'
import request from '@/utils/request'

const area1 = ref([])
const route = useRoute()
const fetchData = async () => {
    try {
        const res = await request.get('/mock/area1.json')
        area1.value = res
    } catch (error) {
        console.error('获取数据失败：', error)
    }
}
// ||{}防御性编程，防止空指针异常
const data = computed(() => {
    return area1.value.find(item => item.id === route.params.id) || {}
})

onMounted(() => {
    fetchData()
})
</script>
<style scoped>
.header{
    margin:0 auto;
    width: 80%;
    justify-content: center;
    margin-top: 68px;
}
.header-content {
    display: flex;
    align-items: center;
    gap: 16px;
}
.header-content img {
    width: 100px;
    height: 100px;
}
.header-content span {
    flex: 1;
}
.introduction{
    margin:0 auto;
    width: 80%;
    justify-content: center;
}
.download{
    margin:0 auto;
    width: 80%;
    justify-content: center;
}
</style>
