<template>
  <div>
    <HeaderBlock
      title="Контактная информация"
      bg="/img/headerBlock-bg-4.jpg"
      class="sHeaderBlock sHeaderBlock--max-height"
    />
    <ContactBlock />
  </div>
</template>

<script setup>
  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

  const breadcrumbsStore = useBreadcrumbsStore();

  breadcrumbsStore.setNameFromIds();

  definePageMeta({
    breadcrumbName: 'Контакты',
  });

  useHead({
    title: 'Контакты',
  });
</script>
