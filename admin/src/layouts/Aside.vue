<template>
    <div class="lay-aside">
        <el-menu
            class="el-menu-vertical"
            active-text-color="#ffd04b"
            background-color="#2a3545"
            text-color="#fff"
            :collapse="isCollapse"
            router
            >
            <div class="logo-container">
                <h3 v-show="!isCollapse" class="logo-text">通用后台</h3>
                <h3 v-show="isCollapse" class="logo-text">后台</h3>
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
                <el-menu-item-group>
                    <el-menu-item
                        v-for="subItem in item.children"
                        :key="subItem.path"
                        :index="subItem.path"
                    >
                        <span>{{subItem.label}}</span>
                    </el-menu-item>
                </el-menu-item-group> 
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
    background-color: #2a3545; /* 保持与菜单背景一致 */
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35); /* 增加侧边栏阴影，提升层次感 */
    transition: width 0.3s; /* 平滑过渡效果 */
    box-sizing: border-box;
}

.el-menu-vertical {
    height: 100%;
    border-right: none; /* 去除菜单默认的右边框 */
    padding-top: 12px;
    width: 100%;
}

/* 侧边栏展开时的宽度 */
.el-menu-vertical:not(.el-menu--collapse) {
    width: 220px;
    min-height: 100vh;
}

.el-menu-vertical.el-menu--collapse {
    width: 64px;
}

.el-menu-vertical.el-menu--collapse :deep(.el-menu-item),
.el-menu-vertical.el-menu--collapse :deep(.el-sub-menu__title) {
    justify-content: flex-start;
    padding: 12px 16px;
}

.el-menu-vertical.el-menu--collapse :deep(.el-menu-item) .el-icon,
.el-menu-vertical.el-menu--collapse :deep(.el-sub-menu__title) .el-icon {
    margin-right: 10px;
}

.el-menu-vertical.el-menu--collapse :deep(.el-menu-item) span,
.el-menu-vertical.el-menu--collapse :deep(.el-sub-menu__title) span {
    display: inline;
    color: #ffffff !important;
}

.el-menu-vertical :deep(.el-menu-item) span,
.el-menu-vertical :deep(.el-sub-menu__title) span {
    color: #ffffff !important;
}

/* 优化图标和文字的间距 */
.el-menu-vertical :deep(.el-menu-item),
.el-menu-vertical :deep(.el-sub-menu__title) {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    min-height: 48px;
}

.el-menu-vertical :deep(.el-menu-item) .el-icon,
.el-menu-vertical :deep(.el-sub-menu__title) .el-icon {
    margin-right: 10px;
    min-width: 24px;
}

.el-menu-vertical :deep(.el-menu-item) .el-icon svg,
.el-menu-vertical :deep(.el-sub-menu__title) .el-icon svg {
    width: 18px;
    height: 18px;
}

.el-menu-vertical :deep(.el-menu-item) span,
.el-menu-vertical :deep(.el-sub-menu__title) span,
.el-menu-vertical.el-menu--collapse :deep(.el-menu-item) span,
.el-menu-vertical.el-menu--collapse :deep(.el-sub-menu__title) span {
    color: #ffffff !important;
}

/* 顶部 Logo 区域样式优化 */
.logo-container {
    height: 60px;
    line-height: 60px;
    text-align: center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo-text {
    color: #fff;
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
}

/* 悬停时的背景色优化 */
.el-menu-vertical :deep(.el-menu-item:hover),
.el-menu-vertical :deep(.el-sub-menu__title:hover) {
    background-color: #1f2733 !important;
}
</style>
