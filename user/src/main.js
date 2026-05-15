import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/theme.css'

import App from './App.vue'
import router from './router'
import lazyLoad from './directive/lazyLoad'

const app = createApp(App)
app.directive('lazy', lazyLoad)
app.use(createPinia())
app.use(router)
app.mount('#app')
