<template>
  <NuxtLayout dir="routing/middleware" v-if="dataLoaded">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { $locally } = useNuxtApp();
let dataLoaded = false;

if (process.client) { 

  document.documentElement.setAttribute('data-theme', $locally.getItem('theme'));
  dataLoaded = true;
}

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