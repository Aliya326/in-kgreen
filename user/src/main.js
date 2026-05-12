import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/theme.css'

import App from './App.vue'
import router from './router'
import request from '@/utils/request'
import VueAxios from 'vue-axios'

const app = createApp(App)
app.use(VueAxios, request)
app.use(createPinia())
app.use(router)
app.mount('#app')
