<template>
  <Card class="sNewsCard">
    <template #header>
      <div class="sNewsCard__img-wrap">
        <div class="img-wrap-center">
          <img
            class="object-fit-js"
            alt="user header"
            src="https://primefaces.org/cdn/primevue/images/usercard.png"
          />
        </div>
      </div>
    </template>
    <template #title>
      <div class="date">{{ formattedDate }}</div>
      {{ newsData.title.rendered }}</template
    >
    <template #content>
      <div v-html="newsData.excerpt.rendered"></div>
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
    required: true,
  },
});
const { newsData } = props;
const date = new Date(newsData.date);
const formattedDate = date
  .toLocaleDateString('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  .slice(0, -2);
</script>
