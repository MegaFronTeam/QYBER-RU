<template>
  <div>
    <HeaderBlock
      title="Новости"
      :breadcrumbArr="[{ label: 'Новости' }]"
      bg="/img/headerBlock-bg-1.jpg"
    >
      <!-- TODO: добавить каттегории -->
      <ShareFilterBlock />
    </HeaderBlock>
    <NewsList />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    breadcrumbName: 'Новости',
  });
</script>
