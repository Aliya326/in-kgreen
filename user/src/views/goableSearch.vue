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
            <a @click="handlePage(item)" target="_blank">{{ item.title }}</a>
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
import { ref, computed} from 'vue'
import { useRoute } from 'vue-router'
import { useArticleStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const articleStore = useArticleStore()
const { articleList} = storeToRefs(articleStore)

const route = useRoute()
const keyword = ref(route.query.keyword)
const dataSource = computed(() => {
    return articleList.value.filter(item => 
    item.title.includes(keyword.value) ||
    item.content.includes(keyword.value)
)
})

const handlePage = (item) => {
  router.push(`/atPages/${item.id}`)
}
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