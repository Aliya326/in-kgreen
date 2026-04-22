<!-- 抽屉组件 -->
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
                            placeholder="请输入用户名或邮箱"
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
    phone: '',
    department: ''
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
    phone: [
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式', trigger: 'blur' }
    ]
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
        phone: data.phone || '',
        department: data.department || ''
    }
}

const resetForm = () => {
    editForm.value = {
        name: '',
        email: '',
        region: '',
        status: '',
        phone: '',
        department: ''
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
