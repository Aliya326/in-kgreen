<template>
  <a-menu :selectedKeys="current" mode="horizontal" :items="items" class="header-menu" 
  @click="handleClick"/>
</template>
<script setup>
import { h, ref, computed, nextTick } from 'vue';
import { HomeOutlined, FolderOutlined, InboxOutlined, SearchOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons-vue';
import { Input } from 'ant-design-vue';
import router from '@/router'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const current = computed(() => 
  [router.currentRoute.value.name || 'home']
)
const isSearching = ref(false);
const keyword = ref('');
//需要访问的是一个对象，需要通过 e.key 获取点击的菜单 key，而不是直接访问 item.path
const handleClick = (e) => {
    if (e.key === 'search') {
      isSearching.value = true;
      nextTick(() => {
      const inputEl = document.querySelector('.ant-input');
      inputEl?.focus();
    });
      return;
    }
    if (e.key === 'theme') return;
      router.push({ name: e.key })
}
const items = computed(() => [
  {
    key: 'home',
    icon: () => h(HomeOutlined),
    label: '首页',
    title: '首页',
    path: '/',
  },
  {
    key: 'archive',
    icon: () => h(InboxOutlined),
    label: '归档',
    title: '归档',
    path: '/archive',
  },
  {
    key: 'category',
    icon: () => h(FolderOutlined),
    label: '分类',
    title: '分类',
    path: '/category',
  },
  {
    key: 'about',
      path: '/about',
      label: '关于',
    title: '关于',
  },
  {
    //全局搜索功能
    key: 'search',
    icon: () => h(SearchOutlined),
    label: isSearching.value
      ? h(Input, {
        'onUpdate:value': (val) => {
          keyword.value = val
        },
          placeholder: '输入关键词...',
          autofocus: true,
          onBlur: () => { isSearching.value = false },
          onKeydown: (e) => {
            if (e.key === 'Enter') {
              keyword.value = e.target.value.trim()
              router.push({ name: 'goableSearch', query: { keyword: keyword.value } });
              isSearching.value = false 
            }
          },
          style: { width: '160px' }
        })
      : '搜索',
    title: '搜索',
  },
  {
    key: 'theme',
    label: h('span', {
      style: { cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' },
      onClick: () => themeStore.toggleTheme(),
    }, [
      h(themeStore.isDark ? BulbFilled : BulbOutlined),
      themeStore.isDark ? '浅色' : '深色',
    ]),
  },
]);
</script>
<style scoped>
.header-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    backdrop-filter: blur(12px);
    background: var(--bg-header);
    box-shadow: 0 1px 0 var(--border-color);
}
</style>  
