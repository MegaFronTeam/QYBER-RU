<template>
  <div>
    <HeaderBlock
      title="Добро пожаловать на захватывающий киберспортивный турнир высокого уровня QYBER.RU"
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
  breadcrumbName: 'О проекте',
});

const aboutStore = useAboutStore();
await aboutStore.fetchData();
</script>
