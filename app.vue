<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import './assets/scss/normalize.scss';
@import './assets/scss/main.scss';
</style>

<script setup>
// import { ref } from 'vue';
// import { usePrimeVue } from 'primevue/config';

// const appConfig = useAppConfig();
// const { $locally } = useNuxtApp();
// const currentTheme = ref($locally.getItem('currentTheme'));

// const PrimeVue = usePrimeVue();

// const toggleTheme = () => {
//   let nextTheme = 'lightTheme';
//   if (currentTheme.value === 'lightTheme') nextTheme = 'darkTheme';
//   else if (currentTheme.value === 'darkTheme') nextTheme = 'lightTheme';

//   PrimeVue.changeTheme(currentTheme.value, nextTheme, 'theme-link', () => {});
//   currentTheme.value = nextTheme;

//   $locally.setItem('currentTheme', nextTheme);
//   appConfig.theme = nextTheme;
// };
</script>
