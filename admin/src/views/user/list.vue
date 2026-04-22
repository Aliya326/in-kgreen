<template>
    <div class="user-management">
        <!-- 页面头部 -->
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title">
                    <i class="el-icon-user"></i>
                    用户列表
                </h1>
            </div>
        </div>

        <!-- 用户列表 -->
        <div class="table-section">
            <el-card class="table-card" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span>
                            <el-button type="primary" @click="handleAdd">新增用户</el-button>
                        </span>
                        <span class="search-input">
                            <el-input v-model="value" placeholder="请输入用户名或邮箱搜索" />
                        </span>
                    </div>
                </template>
                
                <el-table 
                    :data="filtersData" 
                    style="width: 100%"
                    :header-cell-style="{ background: '#fafafa', color: '#606266', fontWeight: '600' }"
                    stripe
                    v-loading="false"
                    element-loading-text="加载中..."
                >
                    <el-table-column prop="prop" label="用户名" min-width="120">
                        <template #default="scope">
                            <div class="user-info">
                                <el-avatar :size="32" :src="scope.row.avatar" class="user-avatar">
                                    {{ scope.row.prop.charAt(0) }}
                                </el-avatar>
                                <span class="user-name">{{ scope.row.prop }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="role" label="权限" min-width="100">
                        <template #default="scope">
                            <el-tag 
                                :type="scope.row.role === '管理员' ? 'warning' : 'info'" 
                                size="small"
                                effect="plain"
                            >
                                {{ scope.row.role }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" min-width="180">
                        <template #default="scope">
                            <span class="email-text">{{ scope.row.email }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" min-width="80">
                        <template #default="scope">
                            <el-tag 
                                :type="scope.row.status === 'enabled' ? 'success' : 'danger'" 
                                size="small"
                                effect="light"
                            >
                                {{ scope.row.status === 'enabled' ? '启用' : '禁用' }}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180" fixed="right">
                        <template #default="scope">
                            <div class="action-buttons">
                                <el-button 
                                    type="primary" 
                                    size="small" 
                                    icon="el-icon-edit"
                                    @click="openEditDrawer(scope.row)"
                                >
                                    编辑
                                </el-button>
                                <el-button 
                                    type="danger" 
                                    size="small" 
                                    icon="el-icon-delete"
                                    @click="deleteUser(scope.row)"
                                >
                                    删除
                                </el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                
                <!-- 分页 -->
                <div class="pagination-wrapper">
                    <el-pagination
                        :current-page="1"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableData.length"
                        background
                    />
                </div>
            </el-card>
        </div>

        <UserDrawer
            v-model="dialogVisible"
            ref="userDrawerRef"
            @confirm="onConfirm"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import UserDrawer from '@/compents/dialog.vue'

const value = ref('');
const keyword = computed(() => value.value.trim());
const tableData = ref([
    {
        id: 1,
        prop: '张三',
        role: '管理员',
        email: 'zhangsan@example.com',
        status: 'enabled'
    },
    {
        id: 2,
        prop: '李四',
        role: '普通用户',
        email: 'lisi@example.com',
        status: 'disabled'
    }
])
const filtersData = computed(() => {
    if (!keyword.value) return tableData.value;
    return tableData.value.filter(item => {
        return item.prop.includes(keyword.value) ||
        item.email.includes(keyword.value)
    });
});

const dialogVisible = ref(false)
const userDrawerRef = ref(null)

const handleAdd = () => {
    userDrawerRef.value?.resetForm()
    dialogVisible.value = true
}

const openEditDrawer = (user) => {
    userDrawerRef.value?.setFormData({
        name: user.prop,
        email: user.email,
        region: user.role,
        status: user.status,
        phone: user.phone || '',
        department: user.department || ''
    })
    dialogVisible.value = true
}

//数据的保存
const onConfirm = (formData) => {
    console.log('保存的数据:', formData)
}   

const deleteUser = (user) => {
    const index = tableData.value.findIndex(item => item.id === user.id)
    if (index !== -1) {
        tableData.value.splice(index, 1)
    }
}
</script>
<style>
.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.card-header > span:first-child {
    flex-shrink: 0;
}

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

.userSerch {
    margin-bottom: 16px;
    padding: 24px;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #e4e7ed;
}

.userInfo {
    padding: 24px;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #e4e7ed;
}

.el-card {
    border: 1px solid #e4e7ed;
    border-radius: 6px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
    background: #fff;
}

.el-card__header {
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    padding: 16px 20px;
    font-weight: 600;
    color: #303133;
}

.el-card__body {
    padding: 20px;
}

/* 表格样式 */
.el-table {
    border: 1px solid #e4e7ed;
    border-radius: 6px;
    overflow: hidden;
}

.el-table th {
    background: #f5f7fa;
    color: #606266;
    font-weight: 600;
    border-bottom: 1px solid #e4e7ed;
}

.el-table td {
    border-bottom: 1px solid #ebeef5;
}

.el-table--border::after,
.el-table--group::after,
.el-table::before {
    background-color: #e4e7ed;
}

/* 按钮样式 */
.el-button--primary {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
}

.el-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
}

.el-button--danger {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
}

.el-button--danger:hover {
    background: #f78989;
    border-color: #f78989;
}

.el-button + .el-button {
    margin-left: 12px;
}

/* 表单样式 */
.el-form-item {
    margin-bottom: 20px;
}

.el-form-item__label {
    color: #606266;
    font-weight: 500;
}

.el-input__inner {
    border-radius: 4px;
}

.el-input__inner:focus {
    border-color: #409eff;
}

.el-select .el-input__inner {
    border-radius: 4px;
}

/* 抽屉样式 */
.el-drawer {
    border-radius: 6px 0 0 6px;
}

.el-drawer__header {
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    padding: 16px 20px;
    margin-bottom: 0;
    color: #303133;
    font-weight: 600;
}

.demo-drawer__content {
    padding: 24px;
}

.demo-drawer__footer {
    padding: 16px 20px;
    text-align: right;
    border-top: 1px solid #e4e7ed;
    background: #f5f7fa;
}

/* 状态标签样式 */
.el-tag {
    border-radius: 4px;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .userSerch,
    .userInfo {
        padding: 16px;
    }
    
    .el-form--inline .el-form-item {
        display: block;
        margin-bottom: 16px;
    }
}

</style>