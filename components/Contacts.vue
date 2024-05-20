<template>
  <ul class="contacts">
    <li v-for="(value, name) in globalStore.contacts" :key="name">
      <a :href="value" class="contacts__link" target="_blank">
        <svg-icon :name="name +'.svg'" />
      </a>
    </li>
  </ul>
</template>
 
<script setup>
import { useGlobalStore } from '@/store/globalStore';
const globalStore = useGlobalStore();
</script>
