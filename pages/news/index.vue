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
  import { useBreadcrumbsStore } from '@/store/BreadcrumbStore';

  const newsStore = useNewsStore();

  const breadcrumbsStore = useBreadcrumbsStore();
  definePageMeta({
    breadcrumbName: 'Новости',
  });

  useSeoMeta({
    title: 'Новости',
    // meta: [{ name: 'description', content: 'My amazing site.' }],
  });

  breadcrumbsStore.setNameFromIds();
</script>
