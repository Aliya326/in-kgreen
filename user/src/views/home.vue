<template>
  <div class="home">
    <div class="page-wrapper">
      <div class="content-header">
        <content-header/>
      </div>
      <div class="main-content">
        <a-row :gutter="[12, 12]">
          <a-col :span="6" v-for="item in area1" :key="item.id">
            <a-card class="card" 
            hoverable
            :loading="loading"
            @click="handlePage(item)"
            >
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'
import contentHeader from '@/components/contentHeader.vue'

const router = useRouter()
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
//点击卡片跳转详情页,传数据到atPages.vue，并执行渲染
const handlePage = (item) => {
  router.push(`/atPages/${item.id}`)
}

//在组件挂载完成后获取数据
onMounted(() => {
    fetchData()
})

</script>
<style scoped>
.home{
  width: 65%;
  margin: 68px auto 0;
}
.page-wrapper {
    padding: 0 20px;
    margin: 100px auto 0;
    width: 100%;
}
.content-header {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
}
.card {
    width: 100%;
    height: 200px;
    min-height: 200px;
    min-width: 200px;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>