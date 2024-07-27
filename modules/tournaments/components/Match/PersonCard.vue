<template>
  <RouterLink :to="'/ratings/user-' + item.id" class="sPersonCard">
    <img v-if="item.avatar !== false" :src="item.avatar?.sizes.thumbnail" alt="" class="img" />
    <div class="sPersonCard__wrap">
      <div class="sPersonCard__name h6">
        {{ item.nickname }}
      </div>
      <div class="sPersonCard__status">{{ item.role.value }}</div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
  import type { commandInterface } from '@/modules/tournaments/interfaces/interface';
  const props = defineProps<{
    item: commandInterface;
  }>();
</script>
<style scoped lang="scss">
  img {
    aspect-ratio: 1;
    object-fit: cover;
  }
  .team-inner {
    width: 100%;
  }
  .sMatchHeader {
  }
</style>
