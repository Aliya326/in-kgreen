<template>
    <div class="at-pages">
      <template v-if="loading">
        <a-card class="header" :loading="true" />
      </template>
      <template v-else-if="notFound">
        <a-empty description="未找到该文章" style="margin-top: 80px" />
      </template>
      <template v-else>
        <a-card class="header" :title="data.title">
          <div class="header-content">
              <a-image-preview-group>
                <a-image
                  v-if="data.cover_image"
                  :src="data.cover_image"
                  class="cover-image"
                />
              </a-image-preview-group>
              <span>{{ data.content }}</span>
          </div>
        </a-card>
        <a-card class="introduction" title="简介">
          <div class="md-body" v-html="introHtml"></div>
        </a-card>
        <a-card class="download" title="下载">
          <a-empty description="暂无可下载资源" />
        </a-card>
      </template>
    </div>
</template>
<script  setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { storeToRefs } from 'pinia'
import { useArticleStore } from '@/stores/ArticleList'
import DOMPurify from 'dompurify';

const articleStore = useArticleStore()
const route = useRoute()
const { articleList, loading } = storeToRefs(articleStore)

function sanitize(html) {
  return DOMPurify.sanitize(html)
}

marked.setOptions({ mangle: false, headerIds: false, breaks: true })

const data = computed(() => {
  return articleList.value.find(item => item.id === Number(route.params.id)) || null
})

const notFound = computed(() => !loading.value && !data.value)

const introHtml = computed(() => {
  if (!data.value?.intro_md) return ''
  return sanitize(marked.parse(data.value.intro_md))
})
</script>
<style scoped>
.at-pages {
    padding-top: 68px;
}
.header{
    margin:0 auto;
    width: 80%;
    justify-content: center;
}
.header-content {
    display: flex;
    align-items: center;
    gap: 16px;
}
.cover-image {
    flex: 0 0 auto;
    width: 240px;
    max-width: 40%;
}
.cover-image :deep(.ant-image-img) {
    width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
}
.header-content span {
    flex: 1;
}
.introduction{
    margin: 20px auto;
    width: 80%;
    justify-content: center;
}
.download{
    margin: 20px auto;
    width: 80%;
    justify-content: center;
}
.md-body :deep(h1),
.md-body :deep(h2),
.md-body :deep(h3) {
    margin-top: 12px;
}
.md-body {
    color: var(--text-primary);
    line-height: 1.8;
    font-size: 14px;
}
.md-body :deep(p) {
    margin: 0 0 12px;
    color: var(--text-secondary);
}
.md-body :deep(a) {
    color: var(--color-badge);
    text-decoration: none;
}
.md-body :deep(a:hover) {
    text-decoration: underline;
}
.md-body :deep(ul),
.md-body :deep(ol) {
    padding-left: 1.2em;
    margin: 0 0 12px;
}
.md-body :deep(li) {
    margin: 6px 0;
    color: var(--text-secondary);
}
.md-body :deep(blockquote) {
    margin: 0 0 12px;
    padding: 8px 12px;
    border-left: 3px solid var(--color-badge);
    background: var(--bg-elevated);
    color: var(--text-secondary);
    border-radius: 6px;
}
.md-body :deep(hr) {
    border: 0;
    border-top: 1px solid var(--border-color);
    margin: 16px 0;
}
.md-body :deep(code) {
    padding: 2px 6px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    font-size: 13px;
}
.md-body :deep(pre) {
    margin: 0 0 12px;
    padding: 12px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    overflow: auto;
}
.md-body :deep(pre code) {
    padding: 0;
    border: 0;
    background: transparent;
}
.md-body :deep(img) {
    max-width: 100%;
    border-radius: 10px;
    display: block;
    margin: 8px 0;
}
.md-body :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 12px;
}
.md-body :deep(th),
.md-body :deep(td) {
    border: 1px solid var(--border-color);
    padding: 8px 10px;
}
.md-body :deep(th) {
    background: var(--bg-elevated);
    color: var(--text-primary);
    text-align: left;
}
</style>
