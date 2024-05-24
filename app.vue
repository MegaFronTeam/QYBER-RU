<template>
  <NuxtLoadingIndicator />
  <NuxtLayout dir="routing/middleware" v-if="!lazyShow || globalStore.API_KEY">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useTournamentStore } from '@/store/TournamentStore';
// import { useBreadcrumbsStore } from '@/store/BreadcrumbStore';
const tournamentStore = useTournamentStore();
// const breadcrumbsStore = useBreadcrumbsStore();
const lazyShow = ref(true);

setTimeout(() => {
  lazyShow.value = false;
}, 100);
import { useGlobalStore } from '@/store/globalStore';
const globalStore = useGlobalStore();

onMounted(async () => {
  tournamentStore.getAll();
  // breadcrumbsStore.createBreadcrumb();
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
