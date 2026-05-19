<template>
    <div class="category-management">
        <div class="page-header">
            <div class="header-left">
                <h1 class="page-title">分类管理</h1>
                <p class="page-desc">管理分类</p>
            </div>
        </div>

        <el-card class="table-card" shadow="never">
            <template #header>
                <div class="card-header">
                    <div class="header-actions">
                        <el-button type="primary" class="add-btn" @click="openAddDialog">
                            <el-icon><Plus /></el-icon>
                            添加分类
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
                <el-table-column prop="label" label="分类名称" min-width="160">
                    <template #default="scope">
                        <div class="category-name-cell">
                            <div class="category-dot" :style="{ background: scope.row.color }"></div>
                            <span class="category-name">{{ scope.row.label }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template #default="scope">
                        <div class="action-buttons">
                            <el-button type="primary" size="small" link>
                                编辑
                            </el-button>
                            <el-divider direction="vertical" />
                            <el-button type="danger" size="small" link @click="deleteCategory(scope.row)">
                                删除
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>

  <el-dialog v-model="dialogVisible" title="添加分类" width="450px" destroy-on-close>
    <el-form :model="form">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.label" autocomplete="off" />
        </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addCategory(form)">
        确认添加
      </el-button>
    </template>
  </el-dialog>
</template>     

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCategoryStore } from '@/stores/category'
import { Plus, Search } from '@element-plus/icons-vue'

const formLabelWidth = '120px'
const dialogVisible = ref(false)
const categoryStore = useCategoryStore()
const { categoryList } = storeToRefs(categoryStore)

const searchValue = ref('')
const form = ref({
    label: '',
})

const filteredCategories = computed(() => {
    if (!searchValue.value.trim()) return categoryList.value
    return categoryList.value.filter(item =>
        item.label.includes(searchValue.value)
    )
})

const emit = defineEmits(['deleteCategory', 'addCategory'])
const deleteCategory = async (category) => {
    await categoryStore.deleteCategory(category.id)
}

const openAddDialog = () => {
    dialogVisible.value = true
}

const addCategory = async (form) => {
    await categoryStore.addCategory(form)
    dialogVisible.value = false
    form.label = ''
}
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
