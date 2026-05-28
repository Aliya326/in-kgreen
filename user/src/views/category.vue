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
        <a-row :gutter="[12, 12]" v-if="articleList.length > 0">
          <a-col :xs="24" :sm="12" :md="8" :lg="6" v-for="item in articleList" :key="item.id">
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
        <div v-if="articleList.length" ref="sentinel" class="load-more">
          <a-spin v-if="isFetchingNextPage" />
          <span v-else>已加载 {{ articleList.length }}/{{ total || '-' }}</span>
        </div>
     </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useArticlesInfiniteQuery } from '@/queries/articles'
import { useCategoriesListQuery } from '@/queries/categories'
import { useInfiniteScroll } from '@/utils/useInfiniteScroll'

const router = useRouter()
const category = ref("全部")
const sentinel = ref(null)
const categoryFilter = computed(() => (category.value === '全部' ? '' : category.value))
const articlesQuery = useArticlesInfiniteQuery({ pageSize: 24, category: categoryFilter })
const categoriesQuery = useCategoriesListQuery()
const categoryListData = computed(() => categoriesQuery.data.value || [])
const articleList = computed(() => articlesQuery.data.value?.pages?.flatMap((p) => p.list) || [])
const total = computed(() => articlesQuery.data.value?.pages?.[0]?.total || 0)
const hasNextPage = computed(() => articlesQuery.hasNextPage.value)
const isFetchingNextPage = computed(() => articlesQuery.isFetchingNextPage.value)

const handlePage = (item) => {
  router.push(`/atPages/${item.id}`)
}

useInfiniteScroll(
  sentinel,
  () => {
    if (!hasNextPage.value || isFetchingNextPage.value) return
    void articlesQuery.fetchNextPage()
  },
  { enabled: () => hasNextPage.value && !isFetchingNextPage.value }
)

</script>
<style scoped>
.category {
    width: 80%;
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
.load-more {
  padding: 16px 0;
  display: flex;
  justify-content: center;
  color: var(--text-secondary);
}
</style>
