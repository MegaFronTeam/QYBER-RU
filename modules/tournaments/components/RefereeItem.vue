<template>
  <div class="game">
    <div class="game__title h6">
      Игра {{ index }}
      <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
    </div>
    <Button
      outlined
      label="+ Выбрать команду"
      class="btn-add-team w-full active-btn dashed secondary"
    />
    <Button
      outlined
      label="+ Выбрать команду"
      class="btn-add-team w-full active-btn dashed secondary"
    />
  </div>
</template>

<script setup>
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
