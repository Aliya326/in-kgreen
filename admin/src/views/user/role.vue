<!-- 角色管理 -->
<template>
    <div class="roleInfo">
        <el-card>
            <div class="card-header">
                <h1>角色管理</h1>
                <span>
                <el-button type="primary">添加角色</el-button>
                </span>
                <span class="search-input">
                    <input v-model="value" placeholder="请输入角色名称或权限进行搜索" class="search-input"/>
                </span>
            </div>
       
            <el-table style="width: 100%" :data="filteredRoles">
                <el-table-column prop="id" label="ID"/>
                <el-table-column prop="prop" label="角色名称"/>
                <el-table-column prop="role" label="权限"/>
                <el-table-column prop="prop" label="操作">
                    <template #default="scope">
                        <el-button type="primary">编辑</el-button>
                        <el-button type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const value = ref('');
const keyword = computed(() => value.value.trim().toLowerCase());

const filteredRoles = computed(() => {
    if(!keyword.value) return roles.value;
    return roles.value.filter(role =>
        role.prop.toLowerCase().includes(keyword.value) ||
        role.role.toLowerCase().includes(keyword.value)
    )
});

const roles = ref([
    {
        id: 1,
        prop: 'admin',
        role: '管理员权限'
    },
    {
        id: 2,
        prop: 'user',
        role: '普通用户，只能浏览'
    },
    {
        id: 3,
        prop: 'editor',
        role: '编辑权限，可以修改内容'
    },
    {
        id: 4,
        prop: 'author',
        role: '文章作者，可以创建和编辑自己的文章'
    }
])
</script>

<style scopeed>
.search-input {
    flex: 0 1 320px;
    min-width: 200px;
}

.search-input .el-input {
    width: 100%;
}

.search-input .el-input__wrapper {
    border-radius: 8px;
    box-shadow: 0 0 0 1px #dcdfe6 inset;
    transition: box-shadow 0.25s;
}

.search-input .el-input__wrapper:hover {
    box-shadow: 0 0 0 1px #c0c4cc inset;
}

.search-input .el-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px #409eff inset, 0 0 0 3px rgba(64, 158, 255, 0.1);
}

.card-header .el-button--primary {
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 500;
    letter-spacing: 1px;
    transition: all 0.25s;
}

.card-header .el-button--primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.35);
}
.roleInfo {
    margin-top: 20px;
    padding: 20px;
}

.roleForm {
    padding: 0;
}

.reset-btn {
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 500;
    transition: all 0.3s ease;
    border: 1px solid #dcdfe6;
}

.reset-btn:hover {
    border-color: #409eff;
    color: #409eff;
    transform: translateY(-1px);
}
.el-form-item {
    margin-bottom: 0;
}

.el-form-item__label {
    font-weight: 500;
    color: #606266;
}

.el-card {
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.el-table {
    border-radius: 8px;
    overflow: hidden;
    margin-top: 16px;
}

.el-button + .el-button {
    margin-left: 0;
}

.el-card .el-button {
    margin-bottom: 16px;
}
</style>