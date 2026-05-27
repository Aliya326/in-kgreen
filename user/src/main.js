import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/theme.css'

import App from './App.vue'
import router from './router'
import lazyLoad from './directive/lazyLoad'

import { useArticleStore } from '@/stores/ArticleList'
import { useCategoryStore } from '@/stores/category'

const app = createApp(App)
app.directive('lazy', lazyLoad)
app.use(createPinia())
// 路由守卫，设置页面标题
router.beforeEach((to) => {
  // to 参数包含了即将要进入的路由对象，可以从 meta 元信息中获取预取数据列表
  const list = to.meta?.prefetch
  // 检查 list 是否是一个数组，并且长度不为 0
  // 如果不符合条件，说明没有需要预取的数据，直接放行导航
  if (!Array.isArray(list) || list.length === 0) return true
  // 如果预取列表中包含 'articles'，则调用文章状态管理库的 fetchData 方法获取数据
  if (list.includes('articles')) {
    useArticleStore().fetchData()
  }
  // 如果预取列表中包含 'categories'，则调用分类状态管理库的 fetchData 方法获取数据
  if (list.includes('category')) {
    useCategoryStore().fetchData()
  }
  // 导航守卫允许继续路由跳转
  return true
})

app.use(router)
app.mount('#app')
