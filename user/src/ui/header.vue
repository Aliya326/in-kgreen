<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" class="header-menu" 
  @click="handleClick"
  />
</template>

<script setup>
import { h, ref } from 'vue';
import { HomeOutlined, FolderOutlined, InboxOutlined } from '@ant-design/icons-vue';
import router from '@/router'

const current = ref(['home']);
//需要访问的是一个对象，需要通过 e.key 获取点击的菜单 key，而不是直接访问 item.path
const handleClick = (e) => {
    const key = e.key
      router.push(key)
}
const items = ref([
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
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
  {
    key: 'about',
      path: '/about',
      label: '关于',
    title: '关于',
  },
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
}
</style>  
