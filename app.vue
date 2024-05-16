<template>
  <NuxtLayout dir="routing/middleware">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useSeoMeta({
  favicon: '/favicon.svg',
});

definePageMeta({
  colorMode: 'light',
});
</script>

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
