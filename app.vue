<template>
  <NuxtLayout dir="routing/middleware">
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

const { $locally } = useNuxtApp();
// const router = useRouter();

if (process.client) {
const localStorageObj = ref({
  theme: $locally.getItem('theme'),
//   isAuth: $locally.getItem('token'),
//   email: $locally.getItem('email'),
});


onMounted(() => {

  localStorageObj.value.theme = $locally.getItem('theme');
  if (localStorageObj.value.theme === 'light-theme') {
    document.documentElement.setAttribute('data-theme', 'light-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark-theme');
  }
});
}
</script>
