<template>
  <span class="theme-toggle" @click="themeStore.toggleTheme()">
    <BulbFilled v-if="themeStore.isDark" />
    <BulbOutlined v-else />
    <span class="label">{{ themeStore.isDark ? '浅色' : '深色' }}</span>
  </span>
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
}
.theme-toggle:hover {
  color: var(--color-badge);
}
.label {
  font-size: 14px;
}
</style>
