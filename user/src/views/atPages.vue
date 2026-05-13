<template>
    <div class="at-pages">
      <a-card class="header" :title="data.title">
        <div class="header-content">
            <img :v-lazy="data.cover_image"/>
            <span>{{ data.content }}</span>
        </div>
      </a-card>
      <a-card class="introduction" title="简介">
        <div v-html="introHtml"></div>
      </a-card>
      <a-card class="download" title="下载">
      </a-card>
    </div>
</template>
<script  setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import { useArticleStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const articleStore = useArticleStore()
const route = useRoute()
const { articleList } = storeToRefs(articleStore)

const introHtml = computed(() => {
  return marked(data.value.intro_md || '')
})


// ||{}防御性编程，防止空指针异常
const data = computed(() => {
    return articleList.value.find(item => item.id === route.params.id) || {}
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
</style>
