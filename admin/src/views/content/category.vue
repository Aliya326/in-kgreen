<template>
    <div class="category-management">
        <div class="page-header">
            <div class="header-left">
                <h1 class="page-title">分类管理</h1>
                <p class="page-desc">管理文章分类与内容组织结构</p>
            </div>
        </div>

        <el-card class="table-card" shadow="never">
            <template #header>
                <div class="card-header">
                    <div class="header-actions">
                        <el-button type="primary" class="add-btn">
                            <el-icon><Plus /></el-icon>
                            添加分类
                        </el-button>
                        <el-button type="danger" plain class="delete-btn">
                            <el-icon><Delete /></el-icon>
                            删除分类
                        </el-button>
                    </div>
                    <div class="search-area">
                        <el-input
                            v-model="searchValue"
                            placeholder="搜索分类名称"
                            :prefix-icon="Search"
                            clearable
                            class="search-input"
                        />
                    </div>
                </div>
            </template>

            <el-table
                style="width: 100%"
                :data="filteredCategories"
                :header-cell-style="{ background: '#f8fafc', color: '#475569', fontWeight: '600', fontSize: '13px' }"
                :row-style="{ fontSize: '14px' }"
                stripe
            >
                <el-table-column prop="id" label="ID" width="80">
                    <template #default="scope">
                        <span class="id-badge">{{ scope.row.id }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="分类名称" min-width="160">
                    <template #default="scope">
                        <div class="category-name-cell">
                            <div class="category-dot" :style="{ background: scope.row.color }"></div>
                            <span class="category-name">{{ scope.row.name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="分类描述" min-width="260">
                    <template #default="scope">
                        <span class="category-desc">{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="count" label="文章数" width="100">
                    <template #default="scope">
                        <span class="count-badge">{{ scope.row.count }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template #default="scope">
                        <div class="action-buttons">
                            <el-button type="primary" size="small" link>
                                编辑
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button type="danger" size="small" link>
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
                    :total="categories.length"
                    background
                    small
                />
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Plus, Delete, Search } from '@element-plus/icons-vue'

const searchValue = ref('')

const categories = ref([
    { id: 1, name: '技术文章', description: '前端、后端、数据库等技术相关文章', count: 42, color: '#8b5cf6' },
    { id: 2, name: '生活随笔', description: '日常生活感悟与随想', count: 18, color: '#3b82f6' },
    { id: 3, name: '项目经验', description: '实际项目开发经验与教训总结', count: 28, color: '#10b981' },
    { id: 4, name: '学习笔记', description: '各类技术与知识的学习笔记', count: 35, color: '#f59e0b' },
    { id: 5, name: '资源分享', description: '优质开发工具与学习资源推荐', count: 15, color: '#ef4444' },
])

const filteredCategories = computed(() => {
    if (!searchValue.value.trim()) return categories.value
    return categories.value.filter(item =>
        item.name.includes(searchValue.value) ||
        item.description.includes(searchValue.value)
    )
})
</script>

<style scoped lang="less">
.category-management {
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

    .header-actions {
        display: flex;
        gap: 10px;
    }

    .add-btn {
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    .delete-btn {
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: 500;
        transition: all 0.25s ease;

        &:hover {
            transform: translateY(-1px);
        }
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

.category-name-cell {
    display: flex;
    align-items: center;
    gap: 10px;

    .category-dot {
        width: 10px;
        height: 10px;
        border-radius: 3px;
        flex-shrink: 0;
    }

    .category-name {
        font-weight: 500;
        color: #1f2937;
    }
}

.category-desc {
    color: #64748b;
    font-size: 13px;
}

.count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 24px;
    border-radius: 12px;
    background: #f1f5f9;
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
    padding: 0 8px;
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
