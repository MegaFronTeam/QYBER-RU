<template>
  <NuxtLoadingIndicator />
  <NuxtLayout dir="routing/middleware" v-if="!lazyShow || globalStore.API_KEY">
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>

<script setup>
  import { useGlobalStore } from '@/store/globalStore';
  import { useToast } from 'primevue/usetoast';
  // import { useBreadcrumbsStore } from '@/store/BreadcrumbStore';
  // const breadcrumbsStore = useBreadcrumbsStore();

  const globalStore = useGlobalStore();
  const lazyShow = ref(true);

  setTimeout(() => {
    lazyShow.value = false;
  }, 100);
  definePageMeta({
    colorMode: 'light',
  });
</script>

<style>
  @import './assets/scss/normalize.scss';
  @import './assets/scss/main.scss';
  @import 'primeicons/primeicons.css';
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
