<template>
    <div class="lay-aside">
        <el-menu
            class="el-menu-vertical"
            active-text-color="#6366f1"
            background-color="transparent"
            text-color="#64748b"
            :collapse="isCollapse"
            router
            >
            <div class="logo-container">
                <div class="logo-icon" v-show="!isCollapse">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                </div>
                <h3 v-show="!isCollapse" class="logo-text">通用后台</h3>
                <h3 v-show="isCollapse" class="logo-text-mini">后台</h3>
            </div>
            <el-menu-item
                v-for="item in noChildren"
                :key="item.path"
                :index="item.path"
            >
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{item.label}}</span>
                </template>
            </el-menu-item>
            <el-sub-menu
                v-for="item in hasChildren"
                :key="item.path"
                :index="item.path"
            >
                <template #title>
                    <el-icon>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{item.label}}</span>
                </template>
                <el-menu-item
                    v-for="subItem in item.children"
                    :key="subItem.path"
                    :index="subItem.path"
                >
                    <span>{{subItem.label}}</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAllDataStore } from '@/stores/index'
import { User, House, Document as DocumentIcon } from '@element-plus/icons-vue'

const list = ref([
        {
        path:'/user',
        label:'用户管理',
        icon: User,
        children:[
                {
                    path:'/user/list',
                    label:'用户列表'
                },
                {
                    path:'/user/role',
                    label:'权限'
                }
            ]
        },
        {
            path:'/',
            label:'仪表盘',
            icon: House
        },
        {
            path:'/content',
            label:'内容管理',
            icon: DocumentIcon,
            children:[
                {
                    path:'/content/list',
                    label:'内容列表'
                },
                {
                    path:'/content/category',
                    label:'分类管理'
                }
            ]
        },
        
])
const noChildren = computed(()=>list.value.filter(item => !item.children));
const hasChildren = computed(()=>list.value.filter(item => item.children));
const store = useAllDataStore();
const isCollapse = computed(()=>store.state.isCollapse);
</script>

<style scoped lang="less">
.lay-aside {
    min-width: 64px;
    width: auto;
    height: 100%;
    min-height: 100vh;
    background: #ffffff;
    border-right: 1px solid #e5e7eb;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-sizing: border-box;
    overflow-x: hidden;
}

.el-menu-vertical {
    height: 100%;
    border-right: none;
    padding-top: 0;
    width: 100%;
}

.el-menu-vertical:not(.el-menu--collapse) {
    width: 220px;
    min-height: 100vh;
}

.el-menu-vertical.el-menu--collapse {
    width: 64px;
}

.logo-container {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 16px;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 8px;
    flex-shrink: 0;
}

.logo-icon {
    width: 28px;
    height: 28px;
    color: #6366f1;
    flex-shrink: 0;

    svg {
        width: 100%;
        height: 100%;
    }
}

.logo-text {
    color: #1f2937;
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    white-space: nowrap;
    letter-spacing: 1px;
}

.logo-text-mini {
    color: #1f2937;
    margin: 0;
    font-size: 16px;
    font-weight: 700;
}

.el-menu-vertical.el-menu--collapse :deep(.el-menu-item),
.el-menu-vertical.el-menu--collapse :deep(.el-sub-menu__title) {
    justify-content: center;
    padding: 0 20px;
    height: 48px;
    line-height: 48px;
    margin: 2px 8px;
    border-radius: 8px;
}

.el-menu-vertical.el-menu--collapse :deep(.el-menu-item) .el-icon,
.el-menu-vertical.el-menu--collapse :deep(.el-sub-menu__title) .el-icon {
    margin-right: 0;
    min-width: 20px;
}

.el-menu-vertical.el-menu--collapse :deep(.el-menu-item) span,
.el-menu-vertical.el-menu--collapse :deep(.el-sub-menu__title) span {
    display: none;
}

.el-menu-vertical :deep(.el-menu-item),
.el-menu-vertical :deep(.el-sub-menu__title) {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 0 20px;
    height: 44px;
    line-height: 44px;
    margin: 2px 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
    color: #64748b !important;
}

.el-menu-vertical :deep(.el-menu-item) .el-icon,
.el-menu-vertical :deep(.el-sub-menu__title) .el-icon {
    margin-right: 10px;
    min-width: 24px;
    font-size: 18px;
}

.el-menu-vertical :deep(.el-menu-item) .el-icon svg,
.el-menu-vertical :deep(.el-sub-menu__title) .el-icon svg {
    width: 18px;
    height: 18px;
}

.el-menu-vertical :deep(.el-menu-item) span,
.el-menu-vertical :deep(.el-sub-menu__title) span {
    color: #64748b !important;
    font-size: 14px;
    font-weight: 400;
}

.el-menu-vertical :deep(.el-menu-item:hover),
.el-menu-vertical :deep(.el-sub-menu__title:hover) {
    background-color: #f5f3ff !important;
    color: #6366f1 !important;
}

.el-menu-vertical :deep(.el-menu-item:hover) span,
.el-menu-vertical :deep(.el-sub-menu__title:hover) span {
    color: #6366f1 !important;
}

.el-menu-vertical :deep(.el-menu-item.is-active) {
    background: #eef2ff !important;
    color: #6366f1 !important;
    position: relative;
}

.el-menu-vertical :deep(.el-menu-item.is-active)::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 20px;
    background: #6366f1;
    border-radius: 0 3px 3px 0;
}

.el-menu-vertical :deep(.el-menu-item.is-active) span {
    color: #6366f1 !important;
    font-weight: 500;
}

.el-menu-vertical :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
    color: #6366f1 !important;
}

.el-menu-vertical :deep(.el-sub-menu.is-active > .el-sub-menu__title) span {
    color: #6366f1 !important;
}

.el-menu-vertical :deep(.el-menu-item-group) {
    background: #fafafa;
}

.el-menu-vertical :deep(.el-menu-item-group__title) {
    display: none;
}

.el-menu-vertical :deep(.el-menu-item-group .el-menu-item) {
    padding-left: 52px !important;
    height: 40px;
    line-height: 40px;
    font-size: 13px;
    margin: 1px 8px;
}

.el-menu-vertical :deep(.el-sub-menu__icon-arrow) {
    color: #94a3b8;
}
</style>
