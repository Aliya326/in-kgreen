<template>
    <div class="article-list">
        <div class="page-header">
            <div class="header-left">
                <h1 class="page-title">内容列表</h1>
                <p class="page-desc">管理所有文章内容的发布与编辑</p>
            </div>
        </div>

        <el-card class="table-card" shadow="never">
            <template #header>
                <div class="card-header">
                    <div class="search-area">
                        <el-input
                            v-model="article"
                            placeholder="搜索文章标题或作者"
                            :prefix-icon="Search"
                            clearable
                            class="search-input"
                        />
                        <el-select v-model="value" placeholder="选择状态" clearable class="status-select">
                            <el-option label="已发布" value="published" />
                            <el-option label="草稿" value="draft" />
                        </el-select>
                    </div>
                </div>
            </template>

            <el-table
                :data="filteredData"
                style="width: 100%"
                :header-cell-style="{ background: '#f8fafc', color: '#475569', fontWeight: '600', fontSize: '13px' }"
                :row-style="{ fontSize: '14px' }"
                stripe
            >
                <el-table-column prop="prop" label="文章标题" min-width="200">
                    <template #default="scope">
                        <div class="article-title-cell">
                            <div class="article-icon">
                                <el-icon><Document /></el-icon>
                            </div>
                            <span class="article-name">{{ scope.row.prop }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="author" label="作者" min-width="120">
                    <template #default="scope">
                        <span class="author-text">{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" min-width="100">
                    <template #default="scope">
                        <el-tag
                            :type="scope.row.status === 'published' ? 'success' : 'info'"
                            size="small"
                            effect="light"
                            round
                        >
                            {{ scope.row.status === 'published' ? '已发布' : '草稿' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template #default="scope">
                        <div class="action-buttons">
                            <el-button type="primary" size="small" link>
                                编辑
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button type="danger" size="small" link @click="deleteArticle(scope.row)">
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
                    :total="data.length"
                    background
                    small
                />
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Document } from '@element-plus/icons-vue'

const value = ref('');
const article = ref('');
const data = ref([
    { id: 1, prop: '文章1', author: '作者A', status: 'published' },
    { id: 2, prop: '文章2', author: '作者B', status: 'draft' },
    { id: 3, prop: '文章3', author: '作者A', status: 'published' },
    { id: 4, prop: '文章4', author: '作者C', status: 'draft' },
]);

const filteredData = computed(() => {
    return data.value.filter(item => {
        const matchSearch = !article.value
        || item.prop.includes(article.value)
        || item.author.includes(article.value)
        const matchStatus = !value.value || item.status === value.value
        return matchSearch && matchStatus;
    });
});

const deleteArticle = (article) => {
    const index = data.value.findIndex(item => item.id === article.id)
    if (index !== -1) {
        data.value.splice(index, 1)
    }
}
</script>

<style scoped lang="less">
.article-list {
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

    .search-area {
        display: flex;
        align-items: center;
        gap: 12px;
    }

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

    .status-select {
        width: 140px;

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

.article-title-cell {
    display: flex;
    align-items: center;
    gap: 10px;

    .article-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: #f5f3ff;
        color: #6366f1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        flex-shrink: 0;
    }

    .article-name {
        font-weight: 500;
        color: #1f2937;
    }
}

.author-text {
    color: #64748b;
    font-size: 13px;
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
