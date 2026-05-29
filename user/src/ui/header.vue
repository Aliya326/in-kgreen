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
      <a-auto-complete
        v-if="isSearching"
        :options="options"
        v-model:value="keyword"
        class="search-input"
        @select="onSelect"
        @search="onSearch"
      >
        <a-input
          ref="searchInputRef"
          placeholder="输入关键词，回车搜索"
          allow-clear
          @blur="handleBlur"
          @keydown.enter="handleEnter"
          @keydown.esc="handleEscape"
        />
      </a-auto-complete>
      <button
        v-else
        ref="searchButtonRef"
        type="button"
        class="icon-btn"
        aria-label="打开搜索"
        @click="openSearch"
      >
        <SearchOutlined />
      </button>
      <ThemeToggle />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, h } from 'vue'
import {
  HomeOutlined,
  FolderOutlined,
  InboxOutlined,
  SearchOutlined,
} from '@ant-design/icons-vue'
import router from '@/router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { articleApi } from '@/api/article'

const current = computed(() => [router.currentRoute.value.name || 'home'])

const isSearching = ref(false)
const keyword = ref('')
const options = ref([]) // 用于存储搜索建议选项列表的响应式引用，初始为空数组

const searchInputRef = ref(null)
const searchButtonRef = ref(null)

const openSearch = () => {
  isSearching.value = true
  nextTick(() => {
    searchInputRef.value?.focus?.()
  })
}

const closeSearch = () => {
  isSearching.value = false
  keyword.value = ''
  options.value = []
  nextTick(() => {
    searchButtonRef.value?.focus?.()
  })
}

const handleBlur = () => {
  // 给点击 Enter 的事件先派发的机会
  setTimeout(() => {
    if (!keyword.value) closeSearch()
  }, 150)
}

const goSearch = (raw) => {
  const kw = (raw || '').trim()
  if (!kw) return
  router.push({ name: 'goableSearch', query: { keyword: kw } })
  closeSearch()
}

const handleEnter = () => {
  goSearch(keyword.value)
}

const handleEscape = () => {
  closeSearch()
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

// 搜索文本变化时的回调函数，参数 searchText 是用户输入的内容
let searchSeq = 0
const onSearchCore = async (searchText) => {
  const seq = (searchSeq += 1)
  // 去除输入文本的首尾空格
  const kw = searchText.trim()
  // 如果去除空格后没有内容（空字符串），则清空选项列表并提前返回
  if (!kw) {
    options.value = []
    return
  }

  try {
    const res = await articleApi.page({ pageNo: 1, pageSize: 8, keyword: kw })
    if (seq !== searchSeq) return
    const list = (res?.list || [])
      .map((item) => (item.title || '').toString().trim())
      .filter(Boolean)

    const uniq = Array.from(new Set(list)).slice(0, 8)
    options.value = uniq.map((t) => ({ value: t }))
  } catch {
    if (seq !== searchSeq) return
    options.value = []
  }
}
// 防抖函数：限制函数在指定间隔内只能执行一次，常用于输入搜索等高频触发场景
const onSearch = debounce(onSearchCore, 200) // 对 onSearchCore 进行防抖，延迟 200 毫秒后执行

/**
 * 创建一个防抖函数，返回的新函数在连续调用时会重置延迟计时，只有停止调用后才能执行
 * @param {Function} fn - 需要防抖的目标函数
 * @param {number} [wait=300] - 延迟等待的毫秒数，默认 300ms
 * @param {boolean} [immediate=false] - 是否立即执行第一次调用（然后等待 wait 毫秒后才能再次触发）
 * @returns {Function} - 经过防抖处理的新函数
 */
function debounce(fn, wait = 200, immediate = false) {
  let timer = null // 用于存放 setTimeout 返回的计时器 id

  // 返回一个闭包函数，每次调用时会重置计时器
  return function (...args) {
    // 判断是否需要立即执行：immediate 为 true 且当前没有正在等待的计时器（即第一次调用）
    const callNow = immediate && !timer

    // 如果已经存在计时器（上一次调用还在等待中），则清除它，重新开始计时
    if (timer) clearTimeout(timer)

    // 设置一个新的计时器，在 wait 毫秒后执行回调
    timer = setTimeout(() => {
      timer = null // 计时器执行后重置为空，表示当前无等待中的计时器
      // 如果不是 immediate 模式，则在此处执行真正的函数（使用调用时的 this 和参数）
      if (!immediate) fn.apply(this, args)
    }, wait)

    // 如果是 immediate 模式且是第一次调用（callNow 为 true），则立即执行函数
    if (callNow) fn.apply(this, args)
  }
}
// 选中某个建议项或按下回车时的回调函数，参数 val 是选中的值
const onSelect = (val) => {
  goSearch(val)
}
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
  display: inline-flex;
  align-items: center;
  background: transparent;
  border: none;
}
.icon-btn:hover {
  color: var(--color-badge);
}
.search-input {
  width: 200px;
}
</style>
