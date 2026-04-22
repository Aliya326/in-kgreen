<template>
     <app-header/>
    <router-view></router-view>
</template>
<script>
import AppHeader from '@/compents/header.vue'

export default {
    name:"main",
    components: {
        AppHeader,
    }
}
</script>

<style scoped>
</style>
