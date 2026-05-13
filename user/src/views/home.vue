<template>
  <div class="home-wrapper">
    <div class="home">
      <div class="page-wrapper">
        <div class="content-header">
          <content-header/>
        </div>
        <div class="main-content" v-lazy>
          <a-row :gutter="[12, 12]">
            <a-col :span="8" v-for="item in articleList" :key="item.id">
              <a-card class="card" 
              hoverable
              :loading="loading"
              @click="handlePage(item)"
              >
                <template #cover>
                    <a-image :v-lazy="item.cover_image" :preview="false"/>
                </template>
                <p>{{ item.title }}</p>
                <a-divider/>
                <a-tag color="processing">{{ item.category }}</a-tag>
              </a-card>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <Sidercard/>
    </div>
  </div>
</template>

<script setup>
import contentHeader from '@/components/contentHeader.vue'
import Sidercard from '@/components/contanSidebar.vue'
import { useArticleStore } from '@/stores/counter'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'


const router = useRouter()
const articleStore = useArticleStore()
const { articleList, loading } = storeToRefs(articleStore)
const handlePage = (item) => {
  router.push(`/atPages/${item.id}`)
}


</script>
<style scoped>
.home-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 68px;
}
.home{
  width: 65%;
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
    height: 100%;
    min-height: 200px;
    min-width: 200px;
    border-radius: 10px;
    padding: 10px;
}
.card :deep(.ant-card-body) {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
}
.card :deep(.ant-card-body) > p {
    flex: 1;
    margin-bottom: 0;
}
.card :deep(.ant-card-body) > .ant-divider {
    margin: 8px 0;
}
.card :deep(.ant-card-body) > .ant-tag {
    align-self: flex-start;
}
.sidebar {
    display: flex;
    width: 30%;
    height: 100%;
    margin-left: 20px;
    margin-top: 100px;
}
</style>