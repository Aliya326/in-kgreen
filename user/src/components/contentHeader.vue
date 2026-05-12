<template>
  <a-carousel autoplay>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </a-carousel>
</template>
<script lang="ts" setup>

</script>
<style scoped>
:deep(.slick-list),
:deep(.slick-track) {
  border-radius: 10px;
  overflow: hidden;
}

:deep(.slick-slide) {
  text-align: center;
  height: 160px;
  line-height: 160px;
  background: var(--bg-spotlight);
  overflow: hidden;
}

:deep(.slick-slide h3) {
  color: var(--text-inverse);
}
</style>
