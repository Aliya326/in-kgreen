<template>
    <div>
        <h1>分类管理</h1>
    </div>
    <div>
        <el-button type="primary">添加分类</el-button>
        <el-button type="danger">删除分类</el-button>
    </div>
  
    <el-card>
        <el-table style="width: 100%">
            <el-table-column prop="id" label="ID" width="50" />
            <el-table-column prop="name" label="分类名称" />
            <el-table-column prop="description" label="分类描述" />
        </el-table>
    </el-card>
</template>

<script>

</script>

<style>

</style>