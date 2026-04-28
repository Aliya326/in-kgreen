<template>
   <div class="common-layout">
    <el-container class="lay-container">
      <el-aside width="auto">
        <Aside />
      </el-aside>
      <el-container>
        <el-header class="lay-header">
          <Header />
        </el-header>
        <el-main class="lay-main">
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
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  padding: 0;
  height: 56px;
  z-index: 10;
}

.lay-main {
  background: #f0f2f5;
  padding: 0;
  overflow-y: auto;
}
</style>
