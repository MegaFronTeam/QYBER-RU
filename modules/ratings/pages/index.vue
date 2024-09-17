<template>
  <div>
    <HeaderBlock title="Рейтинги" bg="/img/headerBlock-bg-10.jpg" class="sHeaderBlock">
      <ShareFilterBlock hideShowAll="true" :fetchMethod="ratingStore.fetchRatings" />
    </HeaderBlock>
    <RaitingBlock />
  </div>
</template>
<script setup>
  import RaitingBlock from '@/modules/ratings/components/RaitingBlock';
  import { UseRatingStore } from '../store/RatingStore';
  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

  const breadcrumbsStore = useBreadcrumbsStore();

  breadcrumbsStore.setNameFromIds();

  definePageMeta({
    title: 'Рейтинги',
    breadcrumbName: 'Рейтинги',
  });

  useHead({
    title: 'Рейтинги',
  });

  const ratingStore = UseRatingStore();
</script>
