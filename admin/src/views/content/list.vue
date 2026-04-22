<!-- 文章管理 -->
<template>
    <div class="article-search">
        <el-card>
            <div slot="header">搜索条件</div>
            <el-form label-width="80px">
                <el-form-item label="文章标题">
                    <el-input placeholder="请输入文章标题"/>
                </el-form-item>
                <el-form-item label="作者">
                    <el-input placeholder="请输入作者"/>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select placeholder="请选择状态">
                        <el-option label="已发布" value="published"/>
                        <el-option label="草稿" value="draft"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
    <div class="article-list">
        <el-card>
            <div slot="header">文章列表</div>
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="prop" label="文章标题" width="width"/>
                <el-table-column prop="prop" label="作者" width="width"/>
                <el-table-column prop="prop" label="状态" width="width"/>
                <el-table-column prop="prop" label="操作" width="width">
                    <template #default="scope">
                        <el-button type="primary">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>   


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