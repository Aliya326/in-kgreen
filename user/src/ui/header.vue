<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" class="header-menu" />
</template>

<script setup>
import { h, ref } from 'vue';
import { HomeOutlined, FolderOutlined, SettingOutlined } from '@ant-design/icons-vue';
const current = ref(['mail']);
const items = ref([
  {
    key: 'home',
    icon: () => h(HomeOutlined),
    label: '首页',
    title: '首页',
  },
  {
    key: 'archive',
    icon: () => h(FolderOutlined),
    label: '归档',
    title: '归档',
  },
  {
    key: 'sub1',
    icon: () => h(SettingOutlined),
    label: 'Navigation Three - Submenu',
    title: 'Navigation Three - Submenu',
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
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
    key: 'alipay',
    label: h(
      'a',
      {
        href: 'https://antdv.com',
        target: '_blank',
      },
      'Navigation Four - Link',
    ),
    title: 'Navigation Four - Link',
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
}
</style>  
