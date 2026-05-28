import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  function applyTheme(dark) {
    document.documentElement.classList.toggle('dark', dark)
  }

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  watch(isDark, (val) => {
    localStorage.setItem('theme', val ? 'dark' : 'light')
    applyTheme(val)
  }, { immediate: true })

  return { isDark, toggleTheme }
})

export default useThemeStore
