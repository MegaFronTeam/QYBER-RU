<template>
  <section class="sRelatedNews">
    <div class="container">
      <h2 class="h1">Читайте также</h2>
      <div class="sRelatedNews__list template">
        <NewsCard v-for="item of data" :data="item" :key="item.id" />
      </div>
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    data: {
      type: Array,
      required: true,
    },
  });
</script>
