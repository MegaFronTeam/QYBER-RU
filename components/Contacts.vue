<template>
  <ul class="contacts">
    <li v-for="item in globalStore.contacts.socials" :key="item.social.label">
      <a :href="item.link" class="contacts__link" target="_blank">
        <svg-icon :name="item.social.value + '.svg'" />
      </a>
    </li>
  </ul>
</template>

<script setup>
  import { useGlobalStore } from '@/store/globalStore';
  const globalStore = useGlobalStore();
</script>
