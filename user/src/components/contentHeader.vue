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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/ArticleList'

const router = useRouter()
const articleStore = useArticleStore()
const { articleList } = storeToRefs(articleStore)

const slides = computed(() => (articleList.value || []).slice(0, 4))

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
