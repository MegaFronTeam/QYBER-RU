<template>
  <div class="sGridCardItem">
    <div class="sGridCardItem__order">1</div>
    <div class="teams-group">
      <div v-for="(product, index) in products" :key="index">
        <div class="sGridCard sGridCard__team" :class="{'team-success': product.team.success}">
          <div class="sGridCard__wrap">
            <NuxtImg :src="`/img/${product.team.avatar}`" alt="Avatar" class="img" />
            <span>{{ product.team.text }}</span>
          </div>
          <div class="sGridCard__score">{{ product.team.success ? 1 : 0 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const products = ref([
    {
      team: {
        avatar: 'teamGrid-1.png',
        text: 'Команда 1',
        success: 1,
      }
    },
    {
      team: {
        avatar: 'teamGrid-2.png',
        text: 'Команда 2',
        success: 0,
      }
    }
  ])

  const totalRecords = ref(10);
  const rowsPerPage = ref([5, 10, 50, 100]);

</script>
