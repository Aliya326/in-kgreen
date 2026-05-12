<template>
    <appHeader/>
    <Transition name="fade-slide">
        <router-view></router-view>
    </Transition>
</template>
<script setup>
import appHeader from '@/ui/header.vue'

</script>

<style scoped>
.main-content {
    padding-top: 66px;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
