<template>
  <div class="main-wrapper">
    <AppHeader :menubarItems="menubar" />
    <main>
      <Layout>
        <slot></slot>
      </Layout>
    </main>
    <Subscribe />
    <AppFooter :menubarItems="menubar" />
    <RegTournament />
  </div>
</template>

<script setup>
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  import Layout from '@/modules/tournaments/components/Layout.vue';

  const dataMenu = await $fetch(`${BASE_URL}/menu/v1/main`);
  const menubar = [];

  for (const item of dataMenu) {
    menubar.push({
      label: item.title,
      href: item.url,
      icon: item.icon,
    });
  }
</script>
