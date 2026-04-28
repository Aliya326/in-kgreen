<template>
    <el-drawer
        v-model="visible"
        title="用户信息"
        :before-close="handleClose"
        direction="rtl"
        size="480px"
        class="user-drawer"
    >
        <div class="drawer-content">
            <div class="drawer-header">
                <div class="user-avatar-section">
                    <el-avatar :size="72" class="edit-avatar">
                        {{ editForm.name ? editForm.name.charAt(0) : 'U' }}
                    </el-avatar>
                    <el-button type="primary" size="small" class="change-avatar-btn" link>
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
                    label-position="left"
                >
                    <el-form-item label="用户名" prop="name">
                        <el-input
                            v-model="editForm.name"
                            placeholder="请输入用户名"
                            clearable
                        />
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input
                            v-model="editForm.email"
                            placeholder="请输入邮箱"
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
                                <span>管理员</span>
                            </el-option>
                            <el-option label="普通用户" value="普通用户">
                                <span>普通用户</span>
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
                </el-form>
            </div>
        </div>

        <div class="drawer-footer">
            <el-button @click="cancelForm" size="default">
                取消
            </el-button>
            <el-button
                type="primary"
                :loading="loading"
                @click="onClick"
                size="default"
                class="save-btn"
            >
                {{ loading ? '保存中...' : '保存' }}
            </el-button>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = computed({
    get: () => props.modelValue,
    set: (val) => emit('update:modelValue', val)
})

const editForm = ref({
    name: '',
    email: '',
    region: '',
    status: '',
})

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
})

const editFormRef = ref(null)
const loading = ref(false)
const timer = ref(null)

const setFormData = (data) => {
    editForm.value = {
        name: data.name || '',
        email: data.email || '',
        region: data.region || '',
        status: data.status || '',
    }
}

const resetForm = () => {
    editForm.value = {
        name: '',
        email: '',
        region: '',
        status: '',
    }
}

defineExpose({ setFormData, resetForm })

const onClick = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        visible.value = false
        emit('confirm', { ...editForm.value })
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
        })
}

const cancelForm = () => {
    loading.value = false
    visible.value = false
    if (timer.value) {
        clearTimeout(timer.value)
    }
}
</script>

<style scoped lang="less">
.drawer-content {
    padding: 0 4px;
}

.drawer-header {
    margin-bottom: 24px;
}

.user-avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 20px 0;
    background: #f8fafc;
    border-radius: 16px;
    margin: 0 -20px 0 -20px;
    padding-left: 20px;
    padding-right: 20px;

    .edit-avatar {
        background: #6366f1;
        color: #fff;
        font-size: 28px;
        font-weight: 700;
        border: 3px solid #fff;
    }

    .change-avatar-btn {
        font-size: 13px;
        color: #8b5cf6;
    }
}

.drawer-body {
    .edit-form {
        :deep(.el-form-item__label) {
            color: #475569;
            font-weight: 500;
            font-size: 13px;
        }

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

        :deep(.el-select__wrapper) {
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

    :deep(.el-divider__text) {
        color: #94a3b8;
        font-size: 12px;
        font-weight: 500;
    }

    :deep(.el-divider) {
        border-top-color: #f1f5f9;
    }
}

.status-radio {
    :deep(.el-radio__input.is-checked .el-radio__inner) {
        border-color: #8b5cf6;
        background: #8b5cf6;
    }

    :deep(.el-radio__input.is-checked + .el-radio__label) {
        color: #1f2937;
    }
}

.status-enabled {
    color: #059669;
    font-weight: 500;
}

.status-disabled {
    color: #ef4444;
    font-weight: 500;
}

.drawer-footer {
    padding: 16px 24px;
    text-align: right;
    border-top: 1px solid #f1f5f9;
    display: flex;
    justify-content: flex-end;
    gap: 10px;

    .save-btn {
        border-radius: 8px;
        padding: 8px 24px;
        font-weight: 500;
        transition: all 0.2s ease;
    }

    :deep(.el-button--default) {
        border-radius: 8px;
        padding: 8px 20px;
    }
}
</style>

<style lang="less">
.user-drawer {
    .el-drawer__header {
        background: #fafafa;
        border-bottom: 1px solid #f1f5f9;
        padding: 16px 24px;
        margin-bottom: 0;
        color: #1f2937;
        font-weight: 600;
        font-size: 16px;
    }

    .el-drawer__body {
        padding: 24px;
        display: flex;
        flex-direction: column;
    }
}
</style>
