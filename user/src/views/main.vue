<template>
    <appHeader/>
    <router-view></router-view>
</template>
<script setup>
import appHeader from '@/ui/header.vue'

</script>

<style scoped>
.main-content {
    padding-top: 66px;  /* 统一在这里设置 */
}
</style>
