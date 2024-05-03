<template>
  <div class="main-wrapper">
    <AppHeader :menubarItems="menubar" />
    <main>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <Subscribe />
    </main>
    <AppFooter :menubarItems="menubar" />
  </div>
</template>

<style>
@import './assets/scss/normalize.scss';
@import './assets/scss/main.scss';
</style>

<script setup>
const data = await $fetch('https://qyber.ru/wordpress/wp-json/menu/v1/main');
const menubar = [];

for (const item of data) {
  menubar.push({
    label: item.title,
    href: item.url,
    icon: '',
  });
}
</script>
