<template>
  <div class="a-card">
    <a-card>
      <template #actions>
        <GithubOutlined @click="handleClick" />
      </template>
      <a-card-meta :title="user.name" :description="user.description">
        <template #avatar>
          <a-avatar :src="user.avatar" />
        </template>
      </a-card-meta>
    </a-card>
    <a-card title="#标签" style="margin-top: 20px;">
        <a-space :size="[0, 'small']" wrap style="flex-wrap: wrap;">
            <a-tag :bordered="false" color="processing"
            v-for="item in categoryList"
            :key="item.label"
            >{{item.label}}</a-tag>
        </a-space>
    </a-card>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { GithubOutlined } from '@ant-design/icons-vue';
import { useCategoriesListQuery } from '@/queries/categories'
import { useUserStore } from '@/stores/user.js'

const categoriesQuery = useCategoriesListQuery()
const categoryList = computed(() =>
  (categoriesQuery.data.value || []).filter(item => item.label !== '全部')
)
const userStore = useUserStore()
const user = computed(() => userStore.user)

const handleClick = () => {
  const url = user.value.github
  if (url) window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<style scoped>
.a-card {
    width: 300px;
    position: relative;
    flex-shrink: 0;
}
</style>
