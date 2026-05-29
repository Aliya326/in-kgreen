<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-pressed="themeStore.isDark"
    :aria-label="themeStore.isDark ? '切换到浅色模式' : '切换到深色模式'"
    @click="themeStore.toggleTheme()"
  >
    <BulbFilled v-if="themeStore.isDark" />
    <BulbOutlined v-else />
    <span class="label">{{ themeStore.isDark ? '浅色' : '深色' }}</span>
  </button>
</template>

<script setup>
import { BulbOutlined, BulbFilled } from '@ant-design/icons-vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 0 12px;
  color: var(--text-primary);
  user-select: none;
  background: transparent;
  border: none;
}
.theme-toggle:hover {
  color: var(--color-badge);
}
.label {
  font-size: 14px;
}
</style>
