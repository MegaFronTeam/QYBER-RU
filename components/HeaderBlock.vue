<template>
  <section class="sHeaderBlock">
    <div class="container">
      <div class="sHeaderBlock__wrap bg-wrap">
        <img v-if="bg" :src="`${bg}`" alt="bg" class="picture-bg" />
        <Breadcrumbs />
        <h1>{{ title }}</h1>
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import Breadcrumbs from '@/components/share/Breadcrumbs.vue';
const defineProps = defineProps({
  title: {
    type: String,
    required: true,
  },
  bg: {
    type: String,
    required: true,
  },
});
const { title, bg } = defineProps;
</script>
