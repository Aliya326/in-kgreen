<template>
    <div class="article-list">
        <div class="page-header">
            <div class="header-left">
                <h1 class="page-title">内容列表</h1>
                <p class="page-desc">管理所有内容的发布与编辑</p>
            </div>
        </div>

        <el-card class="table-card" shadow="never">
            <template #header>
                <div class="card-header">
                    <el-button class="add-btn" type="primary" size="big" @click="openAddDialog">
                        <el-icon><Plus /></el-icon>
                        添加内容
                    </el-button>
                    <div class="search-area">
                        <el-input
                            v-model="article"
                            placeholder="请输入关键词"
                            :prefix-icon="Search"
                            clearable
                            class="search-input"
                        />
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
                <el-table-column prop="row_number" label="序号" width="80">
                    <template #default="scope">
                        <span class="index-badge">{{ scope.row.row_number }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="prop" label="标题" min-width="200">
                    <template #default="scope">
                        <div class="article-title-cell">
                            <div class="article-icon">
                                <el-icon><Document /></el-icon>
                            </div>
                            <span class="article-name">{{ scope.row.title }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="cover" label="封面" min-width="100">
                    <template #default="scope">
                        <div class="cover-cell">
                            <el-image
                                v-if="getCoverUrl(scope.row)"
                                :src="getCoverUrl(scope.row)"
                                :preview-src-list="[getCoverUrl(scope.row)]"
                                fit="contain"
                                preview-teleported
                                class="cover-image"
                            />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="category" label="标签" min-width="100">
                    <template #default="scope">
                        <el-tag
                            type="success"
                            size="small"
                            effect="light"
                            round
                        >
                            {{ scope.row.category }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="简介" min-width="200">
                    <template #default="scope">
                        {{ scope.row.intro_md }}
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

            <el-drawer v-model="dialogVisible" title="添加内容" width="450px" destroy-on-close>
                <el-form :model="form">
                    <el-form-item label="标题" :label-width="formLabelWidth">
                        <el-input v-model="form.title" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="标签" :label-width="formLabelWidth">
                        <el-input-tag v-model="form.category" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth">
                        <el-input v-model="form.content" style="width: 240px"
                        placeholder="请输入内容"
                        type="textarea"
                        clearable
                        />
                    </el-form-item>
                    <el-form-item label="简介" :label-width="formLabelWidth">
                        <el-input v-model="form.intro_md" style="width: 240px"
                        placeholder="请输入简介"
                        type="textarea"
                        clearable
                        />
                    </el-form-item> 
                    <el-form-item label="上传封面" :label-width="formLabelWidth">
                       <el-upload
                        ref="uploadRef"
                        action="/api/upload"
                        class="cover-uploader"
                        :show-file-list="false"
                        :auto-upload="false"
                        :on-change="handleChange"
                        :limit="1"
                        >
                        <div v-if="form.cover" class="cover-wrapper">
                            <img :src="form.cover" class="cover" />
                            <span class="cover-delete" @click.stop="removeCover">
                                <el-icon><Delete /></el-icon>
                            </span>
                        </div>
                        <el-icon v-else><Plus /></el-icon>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <el-button @click="dialogVisible = false ">取消</el-button>
                    <el-button type="primary" @click="addArticle">
                        确认添加
                    </el-button>
                </template>
            </el-drawer>
        </el-card>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Document, Plus, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useArticleListStore } from '@/stores/articleList'
import { storeToRefs } from 'pinia'

const articleListStore = useArticleListStore()
const { articleList } = storeToRefs(articleListStore)
const value = ref('');
const article = ref('');
const formLabelWidth = '120px';
const dialogVisible = ref(false);
const form = ref({
    title: '',
    category: '',
    content: '',
    intro_md: '',
    cover: '',
    status: '',
})

const coverFile = ref(null);

const handleChange = (uploadFile) => {
    const isImage = uploadFile.raw.type === 'image/jpeg' || uploadFile.raw.type === 'image/png';
    if (!isImage) {
        ElMessage.error('请上传 JPG 或 PNG 格式的图片');
        form.value.cover = '';
        coverFile.value = null;
    } else {
        coverFile.value = uploadFile.raw;
        form.value.cover = URL.createObjectURL(uploadFile.raw);
    }
}

const uploadRef = ref(null);

const removeCover = () => {
    if (form.value.cover) {
        URL.revokeObjectURL(form.value.cover);
    }
    form.value.cover = '';
    coverFile.value = null;
    uploadRef.value?.clearFiles();
}

const filteredData = computed(() => {
    const data = articleList.value.filter(item => {
        const matchSearch = !article.value
        || item.title.includes(article.value)
        || item.content.includes(article.value)
        || item.category.includes(article.value)
        const matchStatus = !value.value || item.status === value.value
        return matchSearch && matchStatus;
    });
    return data.map((item, index) => ({
        ...item,
        row_number: index + 1,
    }))
});

const deleteArticle = (article) => {
    const index = articleList.value.findIndex(item => item.id === article.id)
    if (index !== -1) {
        articleListStore.deleteArticle(article.id)
    }
}

const openAddDialog = () => {
    form.value = { title: '', category: '', content: '', intro_md: '', cover: '', status: '' }
    coverFile.value = null
    dialogVisible.value = true
}

const addArticle = async () => {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('category', form.value.category)
    formData.append('content', form.value.content)
    formData.append('intro_md', form.value.intro_md)
    if (coverFile.value) {
        formData.append('coverFile', coverFile.value)
    }
    await articleListStore.addArticle(formData)
    dialogVisible.value = false
}

const getCoverUrl = (row) => row?.cover_image || row?.cover || ''
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
    .add-btn {
        margin-right: auto;
        border-radius: 8px;
        padding: 8px 16px;
        font-weight: 500;
        transition: all 0.2s ease;
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

.index-badge {
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

.cover-uploader {
    :deep(.el-upload) {
        width: 120px;
        height: 120px;
        border: 1px dashed #d9d9d9;
        border-radius: 8px;
        cursor: pointer;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: border-color 0.3s;

        &:hover {
            border-color: #8b5cf6;
        }
    }

    .cover-wrapper {
        position: relative;
        width: 120px;
        height: 120px;

        .cover {
            width: 120px;
            height: 120px;
            object-fit: cover;
            display: block;
        }

        .cover-delete {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            font-size: 24px;
            opacity: 0;
            transition: opacity 0.2s;
            cursor: pointer;
        }

        &:hover .cover-delete {
            opacity: 1;
        }
    }
}

.cover-cell {
    width: 96px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 8px;
    background: #f8fafc;
}

.cover-image {
    width: 100%;
    height: 100%;
    display: block;

    :deep(.el-image__inner) {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
    }
}
</style>
