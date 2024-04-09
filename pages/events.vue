<template>
  <h1>Event page</h1>
  <Button label="Event Button" />
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Event page',
});
const route = useRoute();

console.log(route.meta.title);
</script>
