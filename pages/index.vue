<template>
  <h1>Index page</h1>
  <Button label="PrimuVue" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
definePageMeta({
  title: 'My home page',
});
const route = useRoute();

console.log(route.meta.title);

const checked = ref(false);
</script>
