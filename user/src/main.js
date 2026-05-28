import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import './assets/theme.css'

import App from './App.vue'
import router from './router'
import lazyLoad from './directive/lazyLoad'

import { queryClient } from '@/queryClient'
import { prefetchRouteData } from '@/queries/routePrefetch'

const app = createApp(App)
app.directive('lazy', lazyLoad)
app.use(createPinia())
app.use(VueQueryPlugin, { queryClient })
// 路由守卫，设置页面标题
router.beforeEach((to) => {
  prefetchRouteData(to)
  return true
})

app.use(router)
app.mount('#app')
