<template>
  <div>

    <HeaderBlock
    title="Давайте начнем продвигать киберспорт в массы вместе"
    :breadcrumbArr="breadcrumb"
    bg="/img/headerBlock-bg-3.jpg"
    class="sHeaderBlock sHeaderBlock--max-height"
    >
    <Button class="sHeaderBlock__btn" label="Стать спонсором" />
    </HeaderBlock>
    <CurrentSponsors />
    <SponsorsAdvantages />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const breadcrumb = ref([
  { label: 'Пункт 1', route: '/' },
  { label: 'Пункт 2', route: '/' },
  { label: 'Пункт 3', route: '/' },
  { label: 'Личный кабинет', route: '/' },
  { label: 'Личный кабинет', route: '/' },
  { label: 'Личный кабинет', route: '/' },
  { label: 'Личный кабинет' },
]);
</script>
