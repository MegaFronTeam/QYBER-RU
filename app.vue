<template>
  <div class="main-wrapper">
    <AppHeader />
    <main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </main>
    <AppFooter />
  </div>
</template>

<style>
@import './assets/scss/normalize.scss';
@import './assets/scss/main.scss';
</style>
