<template>
    <div class="user-management">
        <div class="page-header">
            <div class="header-left">
                <h1 class="page-title">用户列表</h1>
                <p class="page-desc">管理系统中所有用户的信息与权限</p>
            </div>
        </div>

        <el-card class="table-card" shadow="never">
            <template #header>
                <div class="card-header">
                    <el-button type="primary" @click="handleAdd" class="add-btn">
                        <el-icon><Plus /></el-icon>
                        新增用户
                    </el-button>
                    <div class="search-area">
                        <el-input
                            v-model="value"
                            placeholder="搜索用户名或邮箱"
                            :prefix-icon="Search"
                            clearable
                            class="search-input"
                        />
                    </div>
                </div>
            </template>

            <el-table
                :data="filtersData"
                style="width: 100%"
                :header-cell-style="{ background: '#f8fafc', color: '#475569', fontWeight: '600', fontSize: '13px' }"
                :row-style="{ fontSize: '14px' }"
                stripe
                v-loading="false"
                element-loading-text="加载中..."
            >
                <el-table-column prop="prop" label="用户名" min-width="140">
                    <template #default="scope">
                        <div class="user-info">
                            <el-avatar :size="34" :src="scope.row.avatar" class="user-avatar">
                                {{ scope.row.prop.charAt(0) }}
                            </el-avatar>
                            <span class="user-name">{{ scope.row.prop }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role" label="权限" min-width="120">
                    <template #default="scope">
                        <el-tag
                            :type="scope.row.role === '管理员' ? 'warning' : 'info'"
                            size="small"
                            effect="plain"
                            round
                        >
                            {{ scope.row.role }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱" min-width="200">
                    <template #default="scope">
                        <span class="email-text">{{ scope.row.email }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="100">
                    <template #default="scope">
                        <div class="status-cell">
                            <span class="status-dot" :class="scope.row.status === 'enabled' ? 'dot-active' : 'dot-inactive'"></span>
                            <span :class="scope.row.status === 'enabled' ? 'text-active' : 'text-inactive'">
                                {{ scope.row.status === 'enabled' ? '启用' : '禁用' }}
                            </span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template #default="scope">
                        <div class="action-buttons">
                            <el-button
                                type="primary"
                                size="small"
                                link
                                @click="openEditDrawer(scope.row)"
                            >
                                编辑
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button
                                type="danger"
                                size="small"
                                link
                                @click="deleteUser(scope.row)"
                            >
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination-wrapper">
                <el-pagination
                    :current-page="1"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length"
                    background
                    small
                />
            </div>
        </el-card>

        <UserDrawer
            v-model="dialogVisible"
            ref="userDrawerRef"
            @confirm="onConfirm"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted} from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'
import UserDrawer from '@/compents/dialog.vue'
import request from '@/utils/request'

const value = ref('');
const tableData= ref([])
const keyword = computed(() => value.value.trim());
const table = async () =>{
    try{
        const ref = await request.get('/mock/tableData.json')
        tableData.value = ref
    }catch(error){
        console('错误',error)
    }
}

const filtersData = computed(() => {
    if (!keyword.value) return tableData.value;
    return tableData.value.filter(item => {
        return item.prop.includes(keyword.value) ||
        item.email.includes(keyword.value)
    });
});

const dialogVisible = ref(false)
const userDrawerRef = ref(null)
const editingUserId = ref(null)

const handleAdd = () => {
    editingUserId.value = null
    userDrawerRef.value?.resetForm()
    dialogVisible.value = true
}

const openEditDrawer = (user) => {
    editingUserId.value = user.id
    userDrawerRef.value?.setFormData({
        name: user.prop,
        email: user.email,
        region: user.role,
        status: user.status,
    })
    dialogVisible.value = true
}

const onConfirm = (formData) => {
    if (editingUserId.value !== null) {
        const index = tableData.value.findIndex(item => item.id === editingUserId.value)
        if (index !== -1) {
            tableData.value[index] = {
                ...tableData.value[index],
                prop: formData.name,
                role: formData.region,
                email: formData.email,
                status: formData.status,
            }
        }
    } else {
        const newId = tableData.value.length > 0
            ? Math.max(...tableData.value.map(item => item.id)) + 1
            : 1
        tableData.value.push({
            id: newId,
            prop: formData.name,
            role: formData.region,
            email: formData.email,
            status: formData.status,
        })
    }
}

const deleteUser = (user) => {
    const index = tableData.value.findIndex(item => item.id === user.id)
    if (index !== -1) {
        tableData.value.splice(index, 1)
    }
}

onMounted(() => {
    table()
})
</script>

<style scoped lang="less">
.user-management {
    padding: 20px;
}

.page-header {
    margin-bottom: 20px;

    .header-left {
        .page-title {
            font-size: 22px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 4px 0;
        }

        .page-desc {
            font-size: 14px;
            color: #94a3b8;
            margin: 0;
        }
    }
}

.table-card {
    border-radius: 16px;
    border: none;

    :deep(.el-card__header) {
        padding: 16px 20px;
        border-bottom: 1px solid #f1f5f9;
    }
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    .add-btn {
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: 500;
        transition: all 0.2s ease;
    }
}

.search-area {
    .search-input {
        width: 260px;

        :deep(.el-input__wrapper) {
            border-radius: 8px;
            box-shadow: 0 0 0 1px #e5e7eb inset;
            transition: all 0.25s;

            &:hover {
                box-shadow: 0 0 0 1px #c4b5fd inset;
            }

            &.is-focus {
                box-shadow: 0 0 0 1px #8b5cf6 inset, 0 0 0 3px rgba(139, 92, 246, 0.1);
            }
        }
    }
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;

    .user-avatar {
        background: #6366f1;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        flex-shrink: 0;
    }

    .user-name {
        font-weight: 500;
        color: #1f2937;
    }
}

.email-text {
    color: #64748b;
    font-size: 13px;
}

.status-cell {
    display: flex;
    align-items: center;
    gap: 6px;

    .status-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .dot-active {
        background: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
    }

    .dot-inactive {
        background: #f87171;
        box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.15);
    }

    .text-active {
        color: #059669;
        font-weight: 500;
        font-size: 13px;
    }

    .text-inactive {
        color: #ef4444;
        font-weight: 500;
        font-size: 13px;
    }
}

.action-buttons {
    display: flex;
    align-items: center;

    :deep(.el-button) {
        font-size: 13px;
        padding: 0;
        font-weight: 500;
    }

    :deep(.el-divider) {
        margin: 0 4px;
    }
}

.pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    padding: 16px 0 4px 0;

    :deep(.el-pagination) {
        .el-pager li {
            border-radius: 6px;
        }

        .btn-prev,
        .btn-next {
            border-radius: 6px;
        }
    }
}

:deep(.el-table) {
    --el-table-border-color: #f1f5f9;
    --el-table-border: none;
    border-radius: 8px;
    overflow: hidden;

    th.el-table__cell {
        border-bottom: 1px solid #e5e7eb;
    }

    .el-table__row:hover > td {
        background: #faf5ff !important;
    }
}
</style>
