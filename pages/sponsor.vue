<template>
  <div>
    <HeaderBlock
      title="Давайте начнем продвигать киберспорт в массы вместе"
      bg="/img/headerBlock-bg-3.jpg"
      class="sHeaderBlock sHeaderBlock--max-height"
    >
      <!-- TODO: добавить модалку -->
      <!-- <Button class="sHeaderBlock__btn" label="Стать спонсором" /> -->
    </HeaderBlock>
    <CurrentSponsors />
    <SponsorsAdvantages />
  </div>
</template>

<script setup>
definePageMeta({
  breadcrumbName: 'Спонсоры',
});
</script>
