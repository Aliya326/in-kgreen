<template>
    <div class="category">
      <div class="category-header">
            <a-tabs v-model:activeKey="category" style="margin-left: 10px">
                <a-tab-pane 
                v-for="item in categoryListData"
                :key="item.value"
                :tab="item.label"
                />
            </a-tabs>
      </div>        
        <a-row :gutter="[12, 12]" v-lazy>
          <a-col :span="6" v-for="item in categoryList" :key="item.id">
            <a-card class="card" 
            hoverable
            >
              <template #cover>
                  <a-image :src="item.cover_image" :preview="false"/>
              </template>
              <p>{{ item.title }}</p>
              <a-divider/>
              <a-tag color="processing">{{ item.category }}</a-tag>
            </a-card>
          </a-col>
        </a-row>
     </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useArticleStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/category'

const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
const category = ref("all")

const { articleList } = storeToRefs(articleStore)
const { categoryListData } = storeToRefs(categoryStore)

const categoryList = computed(() => {
    if (category.value === "all") return articleList.value
    return articleList.value.filter(item => item.category === category.value)
})

</script>
<style scoped>
.category {
    width: 70%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
}
.category-header {
    display: flex;
    align-items: center;
    margin-top: 68px;
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
</style>