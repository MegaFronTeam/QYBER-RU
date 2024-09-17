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
  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

  const breadcrumbsStore = useBreadcrumbsStore();

  breadcrumbsStore.setNameFromIds();

  definePageMeta({
    breadcrumbName: 'О QYBER',
  });

  useHead({
    title: 'О QYBER',
  });

  const aboutStore = useAboutStore();
  await aboutStore.fetchData();
</script>
