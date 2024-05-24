<template>
  <div class="main-wrapper">
    <AppHeader :menubarItems="menubar" />
    <main>
      <slot> </slot>
    </main>
    <Subscribe />
    <AppFooter :menubarItems="menubar" />
    <regTournament />
  </div>
</template>

<script setup>
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const data = await $fetch(`${BASE_URL}/menu/v1/main`);
  const menubar = [];

  for (const item of data) {
    menubar.push({
      label: item.title,
      href: item.url,
      icon: '',
    });
  }
</script>
