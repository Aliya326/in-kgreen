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
              <img v-lazy="data.cover_image" alt="cover"/>
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

const articleStore = useArticleStore()
const route = useRoute()
const { articleList, loading } = storeToRefs(articleStore)

// 简易 XSS 过滤：移除 script、on* 事件、javascript: 协议
const sanitize = (html) => {
  return String(html)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
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
.header-content img {
    max-width: 240px;
    border-radius: 8px;
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
</style>
