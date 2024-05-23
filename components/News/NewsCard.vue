<template>
  <Card class="sNewsCard">
    <template #header>
      <div class="sNewsCard__img-wrap">
        <div class="img-wrap-center">
          <Skeleton v-if="skeleton === true" height="100%" width="100%"></Skeleton>
          <img v-else class="object-fit-js" alt="user header" :src="img" />
        </div>
      </div>
    </template>
    <template #title>
      <Skeleton v-if="skeleton === true" height="24px" width="91px" class="mb-2"></Skeleton>
      <div v-else class="date">{{ formattedDate }}</div>
      <Skeleton v-if="skeleton === true" height="30px" width="160px"></Skeleton>
      <h5 v-else>{{ newsData.title }}</h5>
    </template>
    <template #content>
      <Skeleton v-if="skeleton === true" height="40px" width="100%"></Skeleton>
      <div v-else v-html="newsData.excerpt"></div>
    </template>
    <template #footer>
      <Skeleton v-if="skeleton === true" height="44px" width="100%"></Skeleton>
      <NuxtLink v-else :to="`/news/${newsData.id}`">
        <Button label="Подробнее" class="w-full" />
      </NuxtLink>
    </template>
  </Card>
</template>

<script setup>
const props = defineProps({
  newsData: {
    type: Object,
    required: false,
  },
  skeleton: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const { newsData } = props;

let img = 'https://primefaces.org/cdn/primevue/images/usercard.png';
if (newsData.thumbnail) {
  img = newsData.thumbnail;
}

const date = new Date(newsData.date);
const formattedDate = date
  .toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  .slice(0, -2);
</script>
