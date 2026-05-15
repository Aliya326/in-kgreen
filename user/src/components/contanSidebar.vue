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
import { useCategoryStore } from '@/stores/category.js'

const categoryStore = useCategoryStore()
const categoryList = computed(() =>
  (categoryStore.categoryListData || []).filter(item => item.label !== '全部')
)

const user = {
  name: 'in-kgreen',
  description: '91',
  avatar: 'https://joeschmoe.io/api/v1/random',
  github: 'https://github.com/',
}

const handleClick = () => {
  window.open(user.github, '_blank')
}
</script>

<style scoped>
.a-card {
   width: 300px;
    height: 200px;
    /*随内容滚动 */
    position: relative;
    /*flex-shrink: 0;使卡片不缩放，保持固定高度*/
    flex-shrink: 0;
}
</style>
