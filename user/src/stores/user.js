import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({
    name: 'kgreen',
    avatar: '',
    description: '一个热爱技术的开发者',
    github: 'https://github.com/',
  })
  return { user }
})

export default useUserStore
