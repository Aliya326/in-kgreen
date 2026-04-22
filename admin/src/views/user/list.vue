<template>
    <div class="user-management">
        <!-- 页面头部 -->
        <div class="page-header">
            <div class="header-content">
                <h1 class="page-title">
                    <i class="el-icon-user"></i>
                    用户管理
                </h1>
            </div>
        </div>

        <!-- 搜索区域 -->
        <div class="search-section">
            <el-card class="search-card">
                <template #header>
                    <div class="card-header">
                        <span class="header-title">
                            <i class="el-icon-search"></i>
                            搜索筛选
                        </span>
                    </div>
                </template>
                <el-form :inline="true" :model="form" class="search-form">
                    <el-row :gutter="24">
                        <el-col :xs="24" :sm="12" :md="8" :lg="6">
                            <el-form-item label="用户名">
                                <el-input 
                                    v-model="form.username" 
                                    placeholder="请输入用户名"
                                    clearable
                                    prefix-icon="el-icon-user"
                                />
                            </el-form-item>
                        </el-col>    
                        <el-col :xs="24" :sm="12" :md="8" :lg="6">
                            <el-form-item class="search-actions">
                                <el-button type="primary" icon="el-icon-search">
                                    搜索
                                </el-button>
                                <el-button type="primary">
                                    重置
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>
        </div>

        <!-- 用户列表 -->
        <div class="table-section">
            <el-card class="table-card" shadow="never">
                <template #header>
                    <div class="card-header">
                        <span class="header-title">
                            <i class="el-icon-document"></i>
                            用户列表
                        </span>
                        <span>
                            <el-button type="primary">新增用户</el-button>
                        </span>
                    </div>
                </template>
                
                <el-table 
                    :data="tableData" 
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
    </div>
    
    <!-- 编辑抽屉 -->
    <el-drawer
        v-model="dialog"
        title="编辑用户信息"
        :before-close="handleClose"
        direction="rtl"
        size="480px"
        class="user-drawer"
    >
        <div class="drawer-content">
            <div class="drawer-header">
                <div class="user-avatar-section">
                    <el-avatar :size="64" class="edit-avatar">
                        {{ editForm.name ? editForm.name.charAt(0) : 'U' }}
                    </el-avatar>
                    <el-button type="text" size="small" class="change-avatar-btn">
                        <i class="el-icon-camera"></i>
                        更换头像
                    </el-button>
                </div>
            </div>
            
            <div class="drawer-body">
                <el-form 
                    :model="editForm" 
                    :rules="formRules"
                    ref="editFormRef"
                    label-width="80px"
                    class="edit-form"
                >
                    <el-form-item label="用户名" prop="name">
                        <el-input 
                            v-model="editForm.name" 
                            placeholder="请输入用户名"
                            prefix-icon="el-icon-user"
                            clearable
                        />
                    </el-form-item>
                    
                    <el-form-item label="邮箱" prop="email">
                        <el-input 
                            v-model="editForm.email" 
                            placeholder="请输入邮箱"
                            prefix-icon="el-icon-message"
                            clearable
                        />
                    </el-form-item>
                    
                    <el-form-item label="权限" prop="region">
                        <el-select 
                            v-model="editForm.region" 
                            placeholder="请选择权限"
                            style="width: 100%"
                        >
                            <el-option label="管理员" value="管理员">
                                <span style="color: #e6a23c">⭐ 管理员</span>
                            </el-option>
                            <el-option label="普通用户" value="普通用户">
                                <span style="color: #909399">👤 普通用户</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="editForm.status" class="status-radio">
                            <el-radio label="enabled" class="status-option">
                                <span class="status-enabled">● 启用</span>
                            </el-radio>
                            <el-radio label="disabled" class="status-option">
                                <span class="status-disabled">● 禁用</span>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    
                    <el-divider content-position="left">其他信息</el-divider>
                    
                    <el-form-item label="手机号" prop="phone">
                        <el-input 
                            v-model="editForm.phone" 
                            placeholder="请输入手机号"
                            prefix-icon="el-icon-phone"
                            clearable
                        />
                    </el-form-item>
                    
                    <el-form-item label="部门" prop="department">
                        <el-input 
                            v-model="editForm.department" 
                            placeholder="请输入部门"
                            prefix-icon="el-icon-office-building"
                            clearable
                        />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        
        <div class="drawer-footer">
            <el-button @click="cancelForm" size="medium">
                <i class="el-icon-close"></i>
                取消
            </el-button>
            <el-button 
                type="primary" 
                :loading="loading" 
                @click="onClick" 
                size="medium"
            >
                <i class="el-icon-check" v-if="!loading"></i>
                {{ loading ? '保存中...' : '保存' }}
            </el-button>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'

// 搜索表单
const form = ref({
    username: '',
    email: '',
    status: ''
})

// 编辑表单
const editForm = ref({
    name: '',
    email: '',
    region: '',
    status: 'enabled',
    phone: '',
    department: ''
})

// 表单验证规则
const formRules = ref({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ],
    region: [
        { required: true, message: '请选择权限', trigger: 'change' }
    ],
    phone: [
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
    ]
})

// 抽屉状态
const dialog = ref(false)
const loading = ref(false)
const timer = ref(null)
const formLabelWidth = ref('120px')

// 表格数据
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

// 方法
const openEditDrawer = (user) => {
    dialog.value = true
    editForm.value.name = user.prop
    editForm.value.email = user.email
    editForm.value.region = user.role
    editForm.value.status = user.status
    editForm.value.phone = user.phone || ''
    editForm.value.department = user.department || ''
}

const deleteUser = (user) => {
    const index = tableData.value.findIndex(item => item.id === user.id)
    if (index !== -1) {
        tableData.value.splice(index, 1)
    }
}

const onClick = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        dialog.value = false
    }, 400)
}

const handleClose = (done) => {
    if (loading.value) return
    
    ElMessageBox.confirm('确定要关闭吗？未保存的数据将丢失。')
        .then(() => {
            loading.value = true
            timer.value = setTimeout(() => {
                done()
                setTimeout(() => {
                    loading.value = false
                }, 400)
            }, 2000)
        })
        .catch(() => {
            // 取消关闭
        })
}

const cancelForm = () => {
    loading.value = false
    dialog.value = false
    if (timer.value) {
        clearTimeout(timer.value)
    }
}


</script>

<style>
/* 后台管理系统整体风格 */
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

/* 卡片样式重置 */
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