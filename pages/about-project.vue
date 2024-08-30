<template>
  <div>
    <HeaderBlock
      title="О QYBER"
      bg="/img/headerBlock-bg-5.jpg"
      class="sHeaderBlock sHeaderBlock--max-height"
    >
    </HeaderBlock>
    <AboutHead />
    <AboutBody />
  </div>
</template>

<script setup>
  import { useAboutStore } from '~/store/AboutStore';

  definePageMeta({
    breadcrumbName: 'О QYBER',
  });

  useHead({
    title: 'О QYBER',
  });

  const aboutStore = useAboutStore();
  await aboutStore.fetchData();
</script>
