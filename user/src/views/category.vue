<template>
    <a-card class="category" title="分类">
        <div class="category-header">
            <p>分类1:</p>
            <a-select v-model:value="category" style="width: 120px; margin-left: 10px">
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="分类1">分类1</a-select-option>
                <a-select-option value="分类2">分类2</a-select-option>
                <a-select-option value="分类3">分类3</a-select-option>
            </a-select>
            <p>分类2:</p>
            <a-select style="width: 120px; margin-left: 10px">
                <a-select-option value="all">全部</a-select-option>
                <a-select-option value="分类1">分类1</a-select-option>
                <a-select-option value="分类2">分类2</a-select-option>
                <a-select-option value="分类3">分类3</a-select-option>
            </a-select>
        </div>
    </a-card>
    <a-row :gutter="[12, 12]">
          <a-col :span="6" v-for="item in categoryList" :key="item.id">
            <a-card class="card" 
            hoverable
            >
              <template #cover>
                  <a-image :src="item.cover_image" :preview="false"/>
              </template>
              <p>{{ item.title }}</p>
              <template #actions>
                  <a-tag color="processing">{{ item.category }}</a-tag>
              </template>
            </a-card>
          </a-col>
        </a-row>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import request from '@/utils/request'

const category = ref("all");
const area1 = ref([]);
const fetchData = async () => {
    try {
        const res = await request.get('/mock/area1.json')
        area1.value = res
    } catch (error) {
        console.error('获取数据失败：', error)
    }
}
const categoryList = computed(() => {
    if(category.value === "all") return area1.value;
    return area1.value.filter(item=>
    item.category===category.value 
    )
})

onMounted(() => {
    fetchData()
})

</script>
<style>
.category{
    margin-top:68px;
    width: 100%;
    height: 100%;
    margin: 10px;
}
.category-header {
    display: flex;
    align-items: center;
}
</style>