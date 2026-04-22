<!-- 角色管理 -->
<template>
    <h1>角色管理</h1>
    <div class="searchForm">
        <el-card class="search-card" shadow="hover">
            <template #header>
                <div class="search-header">
                    <i class="el-icon-search"></i>
                    <span>搜索条件</span>
                </div>
            </template>
            <el-form :model="searchForm" label-width="100px" class="roleForm">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="管理角色">
                            <el-input 
                                v-model="searchForm.roleName" 
                                placeholder="请输入角色名称"
                                clearable
                                prefix-icon="el-icon-user"
                                class="search-input"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="权限">
                            <el-select 
                                v-model="searchForm.permission" 
                                placeholder="请选择权限"
                                clearable
                                class="search-select">
                                <el-option label="管理员" value="admin"/>
                                <el-option label="普通用户" value="user"/>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item class="searchOption"> 
                            <el-button 
                                type="primary" 
                                icon="el-icon-search"
                                @click="handleSearch"
                                class="search-btn">
                                搜索
                            </el-button>
                            <el-button 
                                icon="el-icon-refresh"
                                @click="handleReset"
                                class="reset-btn">
                                重置
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
    </div>

    <div class="roleInfo">
        <el-card>
            <div>
                <el-button type="primary">添加角色</el-button>
            </div>
            <div slot="header">角色列表</div>
            <div></div>
            <el-table style="width: 100%" :data="roles">
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
import { ref } from 'vue';

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
    }
])

const searchForm = ref({
    roleName: '',
    permission: ''
})

const handleSearch = () => {
    console.log('搜索条件:', searchForm.value)
}

const handleReset = () => {
    searchForm.value = {
        roleName: '',
        permission: ''
    }
}
</script>

<style>
.roleInfo {
    margin-top: 20px;
    padding: 20px;
}

.searchForm {
    margin-bottom: 20px;
}

.search-card {
    border-radius: 12px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.08);
    border: 1px solid #e4e7ed;
    transition: all 0.3s ease;
}

.search-card:hover {
    box-shadow: 0 6px 25px 0 rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}

.search-header {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

.search-header i {
    margin-right: 8px;
    color: #409eff;
    font-size: 18px;
}

.roleForm {
    padding: 0;
}

.search-input .el-input__inner,
.search-select .el-input__inner {
    border-radius: 8px;
    transition: all 0.3s ease;
    height: 40px;
}

.search-input .el-input__inner:focus,
.search-select .el-input__inner:focus {
    border-color: #409eff;
}

.search-btn {
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
}

.search-btn:hover {
    background: linear-gradient(135deg, #66b1ff 0%, #409eff 100%);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.4);
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

.searchOption {
    text-align: left;
    display: flex;
    gap: 12px;
    align-items: flex-end;
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

@media (max-width: 768px) {
    .el-col {
        margin-bottom: 16px;
    }
    
    .searchOption {
        justify-content: flex-start;
    }
    
    .search-btn,
    .reset-btn {
        flex: 1;
    }
}
</style>