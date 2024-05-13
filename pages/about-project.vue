<template>
  <HeaderBlock
    title="Добро пожаловать на захватывающий киберспортивный турнир высокого уровня QYBER.RU"
    :breadcrumbArr="breadcrumb"
    bg="/img/headerBlock-bg-5.jpg"
    class="sHeaderBlock sHeaderBlock--max-height"
  >
  </HeaderBlock>
  <AboutHead />
  <AboutBody />
</template>

<script setup>
import { ref } from 'vue';

const breadcrumb = ref([{ label: 'О проекте' }]);
</script>
