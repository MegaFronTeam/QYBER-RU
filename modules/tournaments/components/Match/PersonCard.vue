<template>
  <div class="sPersonCard">
    <img v-if="item.avatar !== false" :src="item.avatar?.sizes.thumbnail" alt="" class="img" />
    <div class="sPersonCard__wrap">
      <div class="sPersonCard__name h6">
        {{ item.nickname }}
      </div>
      <div class="sPersonCard__status">{{ item.role.value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    item: {
      avatar?:
        | {
            sizes: {
              thumbnail?: string;
            };
          }
        | false;
      nickname?: string;
      role: {
        value: string;
      };
    };
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
