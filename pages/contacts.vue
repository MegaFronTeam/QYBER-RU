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
  definePageMeta({
    breadcrumbName: 'Контакты',
  });

  useHead({
    title: 'Контакты',
  });
</script>
