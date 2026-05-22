<template>
    <div class="main-content">
        <appHeader/>
        <router-view v-slot="{ Component, route }">
            <Transition name="fade-slide" mode="out-in">
                <component :is="Component" :key="route.path" />
            </Transition>
        </router-view>
    </div>
</template>
<script setup>
import appHeader from '@/ui/header.vue'

</script>

<style scoped>
.main-content {
  padding-top: 66px;
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
  will-change: opacity, transform;
}
.fade-slide-enter-from { opacity: 0; transform: translateY(10px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
