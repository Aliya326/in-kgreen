<template>
  <div class="about-wrapper">
    <div class="about-container">
      <a-card class="about-card">
        <a-card-meta
          :title="user.name"
          :description="user.description"
        >
          <template #avatar>
            <a-avatar :size="64" :src="user.avatar || undefined" />
          </template>
        </a-card-meta>
        <a-divider />
        <div class="about-section">
          <h3>关于本站</h3>
          <p>一个基于 Vue 3 的个人博客，记录技术思考与生活感悟。</p>
        </div>
        <a-divider />
        <div class="about-section">
          <h3>技术栈</h3>
          <a-space :size="[8, 8]" wrap>
            <a-tag color="green">Vue 3</a-tag>
            <a-tag color="blue">Pinia</a-tag>
            <a-tag color="orange">Ant Design Vue</a-tag>
            <a-tag color="purple">Vite</a-tag>
            <a-tag color="cyan">Vue Router</a-tag>
            <a-tag color="red">Axios</a-tag>
          </a-space>
        </div>
        <a-divider />
        <div class="about-section">
          <h3>联系方式</h3>
          <a-space :size="16">
            <a v-if="user.github" :href="user.github" target="_blank">
              <GithubOutlined style="font-size: 24px" />
            </a>
          </a-space>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { GithubOutlined } from '@ant-design/icons-vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>

<style scoped>
.about-wrapper {
  padding-top: 68px;
  display: flex;
  justify-content: center;
}
.about-container {
  width: 60%;
  max-width: 800px;
  padding: 0 20px;
}
.about-card {
  border-radius: 10px;
}
.about-section h3 {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}
.about-section p {
  color: var(--text-secondary);
  line-height: 1.8;
}
</style>
