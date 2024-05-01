<template>
  <Card class="sNewsCard">
    <template #header>
      <div class="sNewsCard__img-wrap">
        <div class="img-wrap-center">
          <img class="object-fit-js" alt="user header" :src="img" />
        </div>
      </div>
    </template>
    <template #title>
      <div class="date">{{ formattedDate }}</div>
      <h5>{{ newsData.title }}</h5>
    </template>
    <template #content>
      <div v-html="newsData.excerpt"></div>
    </template>
    <template #footer>
      <NuxtLink :to="`/news/${newsData.id}`">
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
