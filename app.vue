<template>
  <NuxtLayout> 
      <NuxtPage /> 
  </NuxtLayout>
</template>

<style>
@import './assets/scss/normalize.scss';
@import './assets/scss/main.scss';
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.1s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const { $locally } = useNuxtApp();
  if ($locally.getItem('theme') === 'light-theme') {
    document.documentElement.setAttribute('data-theme', 'light-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark-theme');
  }
});
</script>
