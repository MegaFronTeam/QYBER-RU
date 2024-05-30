<template>
  <div class="game">
    <div class="game__title h6">
      Игра {{ index }}
      <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
    </div>

    <GameItem />
    <GameItem />
  </div>
</template>

<script setup>
  import GameItem from './GameItem.vue';
  const props = defineProps({
    item: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
</script>
