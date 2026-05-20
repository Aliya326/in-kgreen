<template>
  <div class="home-wrapper">
    <div class="page-wrapper">
      <div class="content-header">
        <content-header/>
      </div>
      <div class="content-body">
        <div class="main-content">
          <a-row :gutter="[12, 12]">
            <a-col :xs="24" :sm="12" :md="8" :lg="8" 
            v-for="item in articleList" 
            :key="item.id"
            :loading="loading">
              <a-card class="card" 
              hoverable
              @click="handlePage(item)"
              >
                <template #cover>
                  <div class="cover-wrap">
                    <a-image class="cover-image" :src="item.cover_image" :preview="false" />
                  </div>
                </template>
                <p>{{ item.title }}</p>
                <a-divider/>
                <a-tag color="processing">{{ item.category || '未分类' }}</a-tag>
              </a-card>
            </a-col>
          </a-row>
        </div>
        <div class="sidebar">
          <Sidercard/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import contentHeader from '@/components/contentHeader.vue'
import Sidercard from '@/components/contanSidebar.vue'
import { useArticleStore } from '@/stores/ArticleList'
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
}
.page-wrapper {
    padding: 0 20px;
    margin: 100px auto 0;
    width: 80%;
    max-width: 1200px;
}
.content-header {
    width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
}
.content-body {
    display: flex;
}
.main-content {
    flex: 1;
}
.card {
    width: 100%;
    min-width: 200px;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
}
.card :deep(.ant-card-cover) {
    flex: 0 0 auto;
}
.card :deep(.ant-card-body) {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
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
    width: 300px;
    flex-shrink: 0;
    margin-left: 20px;
    position: sticky;
    top: 100px;
    align-self: flex-start;
    height: fit-content;
}
.cover-wrap {
    width: 100%;
    height: 160px;
    overflow: hidden;
    border-radius: 8px;
}
.cover-wrap :deep(.ant-image) {
    width: 100%;
    height: 100%;
}
.cover-wrap :deep(.ant-image-img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.cover-image {
    width: 100%;
    height: 100%;
}
</style>
