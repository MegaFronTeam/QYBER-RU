<template>
  <div>
    <HeaderBlock
      title="Новости"
      :breadcrumbArr="[{ label: 'Новости' }]"
      bg="/img/headerBlock-bg-1.jpg"
    >
      <!-- TODO: добавить каттегории -->
      <ShareFilterBlock :fetchMethod="newsStore.fetchNews" />
    </HeaderBlock>
    <NewsList />
  </div>
</template>

<script setup>
  import { useNewsStore } from '~/store/NewsStore';
  const newsStore = useNewsStore();

  definePageMeta({
    breadcrumbName: 'Новости',
  });
</script>
