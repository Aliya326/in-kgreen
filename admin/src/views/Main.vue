<template>
   <div class="common-layout">
    <el-container class="lay-container">
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <Aside />
      </el-aside>
      <el-container>
        <!-- 顶部导航栏 -->
        <el-header class="lay-header"> 
          <Header />
        </el-header>
        <el-main class="lay-main">
        <!-- 主内容区域 -->
        <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
   </div>
</template>

<script>
import Aside from '@/layouts/Aside.vue'
import Header from '@/layouts/Header.vue'

export default {
  name: 'Main',
  components: {
    Aside,
    Header
  }
}
</script>

<style scoped lang="less"> 
.common-layout,
.lay-container,
:deep(.el-container) {
  min-height: 100vh;
}
:deep(.el-aside) {
  min-height: 100vh;
}
.lay-header {
  background-color: #d2deef;
}
</style>