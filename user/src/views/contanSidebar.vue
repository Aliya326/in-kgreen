<template>
    <div class="sidebar">
            <el-card class="sidebar-card-1">
                <div class="panel">区域2</div>
            </el-card>
            <el-card class="sidebar-card-2">
                <div class="panel">区域3</div>
            </el-card>
            </div>
</template>

<style>
.sidebar {
    width: 300px;
    flex-shrink: 0;
    position: sticky;
    top: 20px;
    align-self: flex-start;
    max-height: calc(100vh - 40px);
    
}

.sidebar-card-1 {
    padding: auto;
    width: 100%;
}

</style>
