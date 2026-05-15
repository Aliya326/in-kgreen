<template>
  <span>
    <template v-for="(segment, index) in segments" :key="index">
      <mark v-if="segment.highlight" class="highlight">{{ segment.text }}</mark>
      <span v-else>{{ segment.text }}</span>
    </template>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  keyword: { type: String, default: '' },
  caseSensitive: { type: Boolean, default: false },
})

const escapeReg = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const segments = computed(() => {
  const kw = (props.keyword || '').trim()
  if (!kw) return [{ text: props.text, highlight: false }]
  const flags = props.caseSensitive ? 'g' : 'gi'
  const regex = new RegExp(`(${escapeReg(kw)})`, flags)
  const parts = props.text.split(regex)
  const testRe = new RegExp(`^${escapeReg(kw)}$`, props.caseSensitive ? '' : 'i')
  return parts.map((part) => ({ text: part, highlight: testRe.test(part) }))
})
</script>

<style scoped>
.highlight {
  background: #fff58c;
  color: inherit;
  padding: 0 2px;
}
:global(html.dark) .highlight {
  background: #6b5b00;
  color: #fff;
}
</style>
