<template>
    <div class="role-management">
        <div class="page-header">
            <div class="header-left">
                <h1 class="page-title">角色管理</h1>
                <p class="page-desc">管理系统中的角色与权限配置</p>
            </div>
        </div>

        <el-card class="table-card" shadow="never">
            <template #header>
                <div class="card-header">
                    <el-button type="primary" class="add-btn">
                        <el-icon><Plus /></el-icon>
                        添加角色
                    </el-button>
                    <div class="search-area">
                        <el-input
                            v-model="value"
                            placeholder="搜索角色名称或权限"
                            :prefix-icon="Search"
                            clearable
                            class="search-input"
                        />
                    </div>
                </div>
            </template>

            <el-table
                style="width: 100%"
                :data="filteredRoles"
                :header-cell-style="{ background: '#f8fafc', color: '#475569', fontWeight: '600', fontSize: '13px' }"
                :row-style="{ fontSize: '14px' }"
                stripe
            >
                <el-table-column prop="id" label="ID" width="80">
                    <template #default="scope">
                        <span class="id-badge">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="prop" label="角色名称" min-width="160">
                    <template #default="scope">
                        <div class="role-name-cell">
                            <div class="role-icon" :class="getRoleClass(scope.row.prop)">
                                {{ scope.row.prop.charAt(0).toUpperCase() }}
                            </div>
                            <span class="role-name">{{ scope.row.prop }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="role" label="权限描述" min-width="260">
                    <template #default="scope">
                        <span class="role-desc">{{ scope.row.role }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120" fixed="right">
                    <template #default="scope">
                        <el-button
                            type="danger"
                            size="small"
                            link
                            @click="deleteRole(scope.row)"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, Search } from '@element-plus/icons-vue'

const value = ref('');
const keyword = computed(() => value.value.trim().toLowerCase());

const filteredRoles = computed(() => {
    if(!keyword.value) return roles.value;
    return roles.value.filter(role =>
        role.prop.toLowerCase().includes(keyword.value) ||
        role.role.toLowerCase().includes(keyword.value)
    )
});

const getRoleClass = (prop) => {
    const map = {
        admin: 'role-admin',
        user: 'role-user',
        editor: 'role-editor',
        author: 'role-author'
    }
    return map[prop] || 'role-default'
}

const deleteRole = (role) => {
    const index = roles.value.findIndex(item => item.id === role.id)
    if (index !== -1) {
        roles.value.splice(index, 1)
    }
}

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

<style scoped lang="less">
.role-management {
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

.id-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: #f1f5f9;
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
}

.role-name-cell {
    display: flex;
    align-items: center;
    gap: 10px;

    .role-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
        flex-shrink: 0;

        &.role-admin {
            background: #f59e0b;
        }

        &.role-user {
            background: #3b82f6;
        }

        &.role-editor {
            background: #10b981;
        }

        &.role-author {
            background: #6366f1;
        }

        &.role-default {
            background: #64748b;
        }
    }

    .role-name {
        font-weight: 500;
        color: #1f2937;
    }
}

.role-desc {
    color: #64748b;
    font-size: 13px;
}

:deep(.el-table) {
    --el-table-border-color: #f1f5f9;
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
