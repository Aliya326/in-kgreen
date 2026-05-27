<template>
    <div class="category">
      <div class="category-header">
            <div class="category-tabs">
              <button
                type="button"
                class="category-tab"
                :class="{ active: category === '全部' }"
                @click="category = '全部'"
              >
                全部
              </button>
              <button
                v-for="item in categoryListData"
                :key="item.value"
                type="button"
                class="category-tab"
                :class="{ active: category === item.value }"
                @click="category = item.value"
              >
                {{ item.label }}
              </button>
            </div>
      </div>        
        <a-row :gutter="[12, 12]" v-if="categoryList.length > 0">
          <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="item in categoryList" :key="item.id">
            <a-card class="card" 
            hoverable
            @click="handlePage(item)"
            >
              <template #cover>
                <div class="cover-wrap">
                  <img v-lazy="item.cover_image" class="cover-img" alt="cover" />
                </div>
              </template>
              <p>{{ item.title }}</p>
              <a-divider/>
              <a-tag color="processing">{{ item.category || '未分类' }}</a-tag>
            </a-card>
          </a-col>
        </a-row>
        <a-empty v-else description="该分类下暂无内容" style="margin-top: 60px" />
     </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useArticleStore } from '@/stores/ArticleList'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/category'
import { useRouter } from 'vue-router'

const router = useRouter()
const category = ref("全部")
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()

const { articleList } = storeToRefs(articleStore)
const { categoryListData } = storeToRefs(categoryStore)

const categoryList = computed(() => {
  if (category.value === "全部") return articleList.value
    return articleList.value.filter(item => item.category === category.value)
})

const handlePage = (item) => {
  router.push(`/atPages/${item.id}`)
}

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
.category-tabs {
    display: flex;
    gap: 28px;
    width: 100%;
    padding-left: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    border-bottom: 1px solid var(--border-secondary);
    scrollbar-width: none;
}
.category-tabs::-webkit-scrollbar {
    width: 0;
    height: 0;
}
.category-tab {
    flex: 0 0 auto;
    padding: 12px 0;
    background: transparent;
    border: 0;
    cursor: pointer;
    color: var(--text-primary);
    font-size: 16px;
    position: relative;
}
.category-tab:hover {
    color: var(--color-badge);
}
.category-tab.active {
    color: var(--color-badge);
    font-weight: 500;
}
.category-tab.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: var(--color-badge);
    border-radius: 2px;
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
.cover-wrap {
    width: 100%;
    height: 160px;
    overflow: hidden;
    border-radius: 8px;
}
.cover-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
</style>
