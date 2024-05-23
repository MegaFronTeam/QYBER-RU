<template>
  <div
  class="sPersonCard"
  v-for="(product, index) in products"
  :key="index"
  >
    <NuxtImg :src="`/img/${product.team.avatar}`" alt="Avatar" class="img" />
    <div class="sPersonCard__wrap">
      <div class="sPersonCard__name h6">
        {{ product.team.text }}
      </div>
      <div class="sPersonCard__status">Игрок</div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const products = ref([
    {
      team: {
        avatar: 'avatar-img-3.jpg',
        text: 'Dondo',
      },
      team: {
        avatar: 'avatar-img-3.jpg',
        text: 'Dondo',
      }
    }
  ])

</script>
<style scoped lang="scss">
  

</style>
