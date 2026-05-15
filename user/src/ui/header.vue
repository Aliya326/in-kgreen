<template>
  <div class="header-bar">
    <a-menu
      :selectedKeys="current"
      mode="horizontal"
      :items="items"
      class="header-menu"
      @click="handleClick"
    />
    <div class="header-extra">
      <a-input
        v-if="isSearching"
        v-model:value="keyword"
        placeholder="输入关键词，回车搜索"
        class="search-input"
        autofocus
        allow-clear
        @blur="handleBlur"
        @keydown.enter="handleEnter"
      />
      <SearchOutlined v-else class="icon-btn" @click="openSearch" />
      <ThemeToggle />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import {
  HomeOutlined,
  FolderOutlined,
  InboxOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'
import { h } from 'vue'
import router from '@/router'
import ThemeToggle from '@/components/ThemeToggle.vue'

const current = computed(() => [router.currentRoute.value.name || 'home'])

const isSearching = ref(false)
const keyword = ref('')

const openSearch = () => {
  isSearching.value = true
  nextTick(() => {
    document.querySelector('.search-input input')?.focus()
  })
}

const handleBlur = () => {
  // 给点击 Enter 的事件先派发的机会
  setTimeout(() => {
    if (!keyword.value) isSearching.value = false
  }, 150)
}

const handleEnter = (e) => {
  const kw = (e.target.value || '').trim()
  if (!kw) return
  router.push({ name: 'goableSearch', query: { keyword: kw } })
  isSearching.value = false
  keyword.value = ''
}

const handleClick = (e) => {
  router.push({ name: e.key })
}

const items = computed(() => [
  { key: 'home', icon: () => h(HomeOutlined), label: '首页', title: '首页' },
  { key: 'archive', icon: () => h(InboxOutlined), label: '归档', title: '归档' },
  { key: 'category', icon: () => h(FolderOutlined), label: '分类', title: '分类' },
  { key: 'about', label: '关于', title: '关于' },
])
</script>

<style scoped>
.header-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(12px);
  background: var(--bg-header);
  box-shadow: 0 1px 0 var(--border-color);
  padding: 0 16px;
}
.header-menu {
  flex: 1;
  background: transparent;
  justify-content: center;
  border-bottom: none;
}
.header-extra {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.icon-btn {
  cursor: pointer;
  padding: 0 8px;
  font-size: 16px;
  color: var(--text-primary);
}
.icon-btn:hover {
  color: var(--color-badge);
}
.search-input {
  width: 200px;
}
</style>
