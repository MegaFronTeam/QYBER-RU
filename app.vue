<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import './assets/scss/normalize.scss';
@import './assets/scss/main.scss';
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
