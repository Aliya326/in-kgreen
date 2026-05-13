<template>
    <appHeader/>
    <router-view v-slot="{ Component }">
        <Transition name="fade-slide">
            <component :is="Component" />
        </Transition>
    </router-view>
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
