<template>
  <div class="main-wrapper">
    <AppHeader />
    <main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <Subscribe />
    </main>
    <AppFooter />
  </div>
</template>

<style>
@import './assets/scss/normalize.scss';
@import './assets/scss/main.scss';
</style>
