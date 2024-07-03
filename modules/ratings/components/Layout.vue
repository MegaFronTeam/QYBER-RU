<template>
  <div>
    <HeaderBlock />
    <ContentBlock>
      <slot> </slot>
    </ContentBlock>
    <TournamentsListLast />
  </div>
</template>

<script setup>
  import HeaderBlock from '@/modules/tournaments/components/HeaderBlock.vue';
  import ContentBlock from '@/modules/tournaments/components/ContentBlock.vue';
</script>

<style></style>
