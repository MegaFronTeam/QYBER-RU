<template>
  <HeaderBlock
    title="Контактная информация"
    :breadcrumbArr="breadcrumb"
    bg="/img/headerBlock-bg-4.jpg"
    class="sHeaderBlock sHeaderBlock--max-height"
  />
  <ContactBlock />
</template>

<script setup>
import { ref } from 'vue';

const breadcrumb = ref([{ label: 'Контакты' }]);
</script>
