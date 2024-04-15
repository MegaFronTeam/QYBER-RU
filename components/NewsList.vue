<template>
  <div class="sNews">
    <div class="container">
      <div class="sNews__list">
        <NewsCard v-for="item of data" :newsData="item" :key="item.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data } = await useFetch('https://qyber.ru/wordpress/wp-json/wp/v2/posts');
</script>
