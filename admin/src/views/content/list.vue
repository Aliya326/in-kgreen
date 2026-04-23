<!-- 文章管理 -->
<template>
    <div class="article-list">
        <el-card>
            <div slot="header">文章列表</div>
            <div class="article-search">
                <el-input v-model="article" placeholder="请输入文章标题或作者进行搜索" clearable />
                <el-select v-model="value" placeholder="请选择状态" style="width: 240px">
                    <el-option :label="已发布" :value="published"/>
                    <el-option :label="草稿" :value="draft"/>
                </el-select>
            </div>      
            <el-table :data="filteredData" style="width: 100%">
                <el-table-column prop="prop" label="文章标题" width="width"/>
                <el-table-column prop="author" label="作者" width="width"/>
                <el-table-column prop="status" label="状态" width="width"/>
                <el-table-column prop="prop" label="操作" width="width">
                    <template #default="scope">
                        <el-button type="primary">编辑</el-button>
                        <el-button type="danger" @click="deleteArticle">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import { ref,computed } from 'vue';

const article = ref('');
const data = ref([
    { id: 1, prop: '文章1', author: '作者A', status: 'published' },
    { id: 2, prop: '文章2', author: '作者B', status: 'draft' },
    { id: 3, prop: '文章3', author: '作者A', status: 'published' },
    { id: 4, prop: '文章4', author: '作者C', status: 'draft' },
    
]);

const filteredData = computed(() => {
    if(!article.value) return data.value;
    return data.value.filter(item => {
        return item.prop.includes(article.value) || item.author.includes(article.value)
        || item.status
        ;
    });
});
const deleteArticle = (article) => {
    const index = data.value.find(item => item.id === article.id)
    if (index !== -1) {
        data.value.splice(index, 1)
    }
}

</script>

<style>
.article-search {
    margin-bottom: 20px;
    padding: 20px;
}

.article-list {
    padding: 20px;
}

.el-card {
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-table {
    border-radius: 8px;
    overflow: hidden;
}

.el-button + .el-button {
    margin-left: 8px;
}

.el-form-item {
    margin-bottom: 18px;
}

</style>