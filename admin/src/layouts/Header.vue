<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" class="collapse-btn"
            @click="store.state.isCollapse = !store.state.isCollapse">
                <el-icon :size="16"><Menu /></el-icon>
            </el-button>
            <el-breadcrumb separator="/" class="header-breadcrumb">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown class="user">
                <span class="el-dropdown-link">
                    <el-avatar :size="32" class="usr-avatar">A</el-avatar>
                    <span class="user-name">Admin</span>
                    <el-icon class="arrow-icon"><ArrowDown /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <el-icon><User /></el-icon>
                            个人中心
                        </el-dropdown-item>
                        <el-dropdown-item divided>
                            <el-icon><SwitchButton /></el-icon>
                            退出
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { Menu, ArrowDown, User, SwitchButton } from '@element-plus/icons-vue'
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
    padding: 0 24px;
    box-sizing: border-box;
}

.l-content {
    display: flex;
    align-items: center;
    gap: 16px;

    .collapse-btn {
        width: 36px;
        height: 36px;
        border: none;
        background: transparent;
        border-radius: 8px;
        color: #64748b;
        transition: all 0.25s ease;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: #f1f5f9;
            color: #1f2937;
        }
    }

    .header-breadcrumb {
        :deep(.el-breadcrumb__item) {
            .el-breadcrumb__inner {
                font-weight: 400;
                font-size: 14px;
                color: #64748b;

                &.is-link {
                    color: #64748b;
                    font-weight: 400;

                    &:hover {
                        color: var(--primary-color, #8b5cf6);
                    }
                }
            }

            &:last-child {
                .el-breadcrumb__inner {
                    color: #1f2937;
                    font-weight: 500;
                }
            }
        }

        :deep(.el-breadcrumb__separator) {
            color: #cbd5e1;
        }
    }
}

.r-content {
    .user {
        cursor: pointer;

        .el-dropdown-link {
            display: flex;
            align-items: center;
            gap: 10px;
            outline: none;
            padding: 4px 12px 4px 4px;
            border-radius: 24px;
            transition: all 0.25s ease;

            &:hover {
                background: #f1f5f9;
            }
        }

        .usr-avatar {
            background: #6366f1;
            color: #fff;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .user-name {
            font-size: 14px;
            font-weight: 500;
            color: #334155;
        }

        .arrow-icon {
            font-size: 12px;
            color: #94a3b8;
        }

        &:hover .usr-avatar {
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
    }
}

:deep(.el-dropdown-menu__item) {
    padding: 8px 20px;
    font-size: 14px;

    .el-icon {
        margin-right: 8px;
    }

    &:hover {
        background: #f5f3ff;
        color: #7c3aed;
    }
}
</style>
