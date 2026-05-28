<template>
  <a-carousel autoplay>
    <div
      v-for="item in slides"
      :key="item.id"
      class="slide"
      @click="goDetail(item)"
    >
      <img v-lazy="item.cover_image" class="slide-img" alt="cover" />
      <div class="slide-overlay">
        <h3 class="slide-title">{{ item.title }}</h3>
        <span class="slide-tag">{{ item.category || '未分类' }}</span>
      </div>
    </div>
    <div v-if="slides.length === 0" class="slide slide-placeholder">
      <h3>kgreen</h3>
    </div>
  </a-carousel>
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useArticlesInfiniteQuery } from '@/queries/articles'

const router = useRouter()
const articlesQuery = useArticlesInfiniteQuery({ pageSize: 20 })
const articleList = computed(() => articlesQuery.data.value?.pages?.[0]?.list || [])

const getTodayKey = () => {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const hash32 = (str) => {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

const mulberry32 = (a) => () => {
  a |= 0
  a = (a + 0x6d2b79f5) | 0
  let t = Math.imul(a ^ (a >>> 15), 1 | a)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const shuffleWithSeed = (list, seedStr) => {
  const res = list.slice()
  const rnd = mulberry32(hash32(seedStr))
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[res[i], res[j]] = [res[j], res[i]]
  }
  return res
}

const todayKey = ref(getTodayKey())
let nextTimer = null

const scheduleNextDay = () => {
  if (nextTimer) clearTimeout(nextTimer)
  const now = new Date()
  const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0)
  nextTimer = setTimeout(() => {
    todayKey.value = getTodayKey()
    scheduleNextDay()
  }, Math.max(0, next.getTime() - now.getTime()))
}

onMounted(() => {
  scheduleNextDay()
})

onUnmounted(() => {
  if (nextTimer) clearTimeout(nextTimer)
})

const slides = computed(() => {
  const list = articleList.value || []
  if (!list.length) return []
  return shuffleWithSeed(list, todayKey.value).slice(0, 4)
})

const goDetail = (item) => {
  router.push(`/atPages/${item.id}`)
}
</script>
<style scoped>
:deep(.slick-list),
:deep(.slick-track) {
  border-radius: 10px;
  overflow: hidden;
}

:deep(.slick-slide) {
  overflow: hidden;
}

.slide {
  height: 220px;
  width: 100%;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 24px 32px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
  color: #fff;
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.slide-title {
  margin: 0;
  color: #fff;
  font-size: 20px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.slide-tag {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 12px;
  flex: 0 0 auto;
}

.slide-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-spotlight);
}

.slide-placeholder h3 {
  color: var(--text-inverse);
}
</style>
