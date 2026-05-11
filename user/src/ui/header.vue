<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" class="header-menu" 
  @click="handleClick"/>
</template>
<script setup>
import { h, ref, computed, nextTick } from 'vue';
import { HomeOutlined, FolderOutlined, InboxOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Input } from 'ant-design-vue';
import router from '@/router'

const current = ref(['home']);
const isSearching = ref(false);
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
      router.push(e.key)
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
    key: 'sub1',
    icon: () => h(FolderOutlined),
    label: '分类',
    title: '分类',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: '分类1',
            title: '分类1',
            key: 'setting:1',
          },
          {
            label: '分类2',
            title:'',
            key: 'setting:2',
          },
          {
            label:'分类3',
            title:'',
            key:'',
          }
        ],
      }
    ],
  },
  {
    key: 'about',
      path: '/about',
      label: '关于',
    title: '关于',
  },
  {
    key: 'search',
    icon: () => h(SearchOutlined),
    label: isSearching.value
      ? h(Input, {
          placeholder: '输入关键词...',
          autofocus: true,
          onBlur: () => { isSearching.value = false },
          onKeydown: (e) => {
            if (e.key === 'Enter') { /* 执行搜索逻辑 */ isSearching.value = false }
          },
          style: { width: '160px' }
        })
      : '搜索',
    title: '搜索',
  }
]);
</script>
<style scoped>
.header-menu {
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    backdrop-filter: blur(12px);
    background: rgba(255,255,255,0.75);
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
}
</style>  
