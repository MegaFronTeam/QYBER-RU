<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div class="main-wrapper">
    <AppHeader />
    <main>
      <Error :errorMsg="error?.statusCode" />
      <!-- <h1>{{ error.statusCode }}</h1>
      <NuxtLink to="/">Go back home</NuxtLink> -->
      <Subscribe />
    </main>
    <AppFooter />
  </div>
</template>

<style>
@import './assets/scss/normalize.scss';
@import './assets/scss/main.scss';
</style>
