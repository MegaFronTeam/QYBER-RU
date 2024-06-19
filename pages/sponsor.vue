<template>
  <div>
    <HeaderBlock
      :title="sponsorsStore.sponsorsPage.post_title"
      bg="/img/headerBlock-bg-3.jpg"
      class="sHeaderBlock sHeaderBlock--max-height"
    >
      <!-- TODO: добавить модалку -->
      <!-- <Button class="sHeaderBlock__btn" label="Стать спонсором" /> -->
      <BecomeSponsor />
    </HeaderBlock>
    <CurrentSponsors />
    <SponsorsAdvantages />
  </div>
</template>

<script setup>
  import { useSponsorsStore } from '@/store/sponsorsStore';

  definePageMeta({
    breadcrumbName: 'Спонсоры',
  });

  const sponsorsStore = useSponsorsStore();
  sponsorsStore.getSponsorsPage();
</script>
