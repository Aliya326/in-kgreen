<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" class="button"
            @click="store.state.isCollapse = !store.state.isCollapse">
                <el-icon><Menu /></el-icon>
            </el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown class="user">
                <span class="el-dropdown-link">
                    <img class="usr" src="../assets/vue.svg" alt="avatar" />
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>  
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { Menu } from '@element-plus/icons-vue'
import { useAllDataStore } from '@/stores/index'
const store = useAllDataStore();
</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.l-content {
    display: flex;
    align-items: center;
    
    .button {
        margin-right: 20px;
    }
    
    /* 面包屑样式定制 */
    :deep(.el-breadcrumb__item) {
        .el-breadcrumb__inner {
            font-weight: normal;
            &.is-link {
                color: #666;
            }
        }
        &:last-child {
            .el-breadcrumb__inner {
                color: #fff;
                cursor: pointer;
            }
        }
    }
}

.r-content {
    .user {
        cursor: pointer;
        
        .el-dropdown-link {
            display: flex;
            align-items: center;
            outline: none;
        }
        
        .usr {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            background-color: #fff; /* 为透明背景的svg提供白色底色 */
            transition: all 0.3s;
            
            &:hover {
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            }
        }
    }
}
</style>