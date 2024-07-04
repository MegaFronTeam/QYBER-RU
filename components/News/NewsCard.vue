<template>
  <Card class="sNewsCard">
    <template #header>
      <div class="sNewsCard__img-wrap">
        <div class="img-wrap-center">
          <Skeleton v-if="skeleton === true" height="100%" width="100%"></Skeleton>
          <template v-else>
            <img class="object-fit-js" alt="user header" :src="data.post_thumbnail" />
          </template>
        </div>
      </div>
    </template>
    <template #title>
      <Skeleton v-if="skeleton === true" height="24px" width="91px" class="mb-2"></Skeleton>
      <div v-else class="date">{{ data.date }}</div>
      <Skeleton v-if="skeleton === true" height="30px" width="160px"></Skeleton>
      <h5 v-else>{{ data.title.rendered }}</h5>
    </template>
    <template #content>
      <Skeleton v-if="skeleton === true" height="40px" width="100%"></Skeleton>
      <div v-else v-html="data.excerpt.rendered"></div>
    </template>
    <template #footer>
      <Skeleton v-if="skeleton === true" height="44px" width="100%"></Skeleton>
      <NuxtLink v-else :to="`/news/${data.id}`">
        <Button label="Подробнее" class="w-full" />
      </NuxtLink>
    </template>
  </Card>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Object,
      required: false,
    },
    skeleton: {
      type: Boolean,
      required: false,
      default: false,
    },
  });
</script>
