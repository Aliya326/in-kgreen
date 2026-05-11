<template>
  <a-list 
   class="search-container"
  item-layout="horizontal" 
  :data-source="dataSource" 
  header="搜索结果">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
          :description="item.content"
        >
          <template #title>
            <a :href="`/pages/${item.id}`" target="_blank">{{ item.title }}</a>
          </template>
          <template #extra>
            <img
                width="272"
                alt="logo"
                :src="item.cover_image"/>
        </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()
const keyword = ref(route.query.keyword)
const dataSource = computed(() => {
    return area1.value.filter(item => 
    item.title.includes(keyword.value) ||
    item.content.includes(keyword.value)
)
})

//在组件挂载完成后获取数据
onMounted(() => {
    fetchData()
})
</script>

<style scoped>
.search-container {
    padding: 20px;
    margin: 0 auto;
    margin-top: 68px;
    justify-content: center;
    width: 50%;
}
</style>