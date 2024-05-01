<template>
  <section class="sRelatedNews">
    <div class="container">
      <h2 class="h1">Читайте также</h2>
      <div class="sRelatedNews__list template">
        <NewsCard
          v-for="item of data"
          :newsData="{
            id: item.ID,
            title: item.post_title,
            date: item.post_date,
            excerpt: item.post_excerpt,
            thumbnail: item.post_thumbnail,
          }"
          :key="item.id"
        />
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

const { data } = props;
</script>
