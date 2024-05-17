<template>
  <section class="sMainContentBlock">
    <div class="container">
      <div class="section-title">
        <h2 class="h1">{{ sectionTitle.title }}</h2>
        <p>{{ sectionTitle.text }}</p>
      </div>
      <div class="template">
        <slot></slot>
      </div>
      <div v-if="footerLink" class="footer-link">
        <NuxtLink :to="footerLink.href">
          {{ footerLink.text }}
          <svg-icon name="chevron-right" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  sectionTitle: {
    type: Object,
    required: false,
  },
  footerLink: {
    type: Object,
    required: false,
  },
});

const { sectionTitle, footerLink } = props;
</script>
