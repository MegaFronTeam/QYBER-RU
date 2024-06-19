<template>
  <div class="sMatchHeader">
    <div class="sMatchHeader__item">
      <div class="img-wrap">
        <NuxtImg :src="`/img/team-img-1.png`" alt="Avatar" class="img" />
      </div>
      <div class="sMatchHeader__status">Team Rogue</div>
    </div>
    <div class="sMatchHeader__item description">
      <p>VS</p>
      <span class="p-badge p-badge-gray">
        <svg-icon name="dota.svg" />
        Dota 2
      </span>
      <div class="sMatchHeader__score h2">1 : 2</div>
      <p>Матч завершен</p>
    </div>
    <div class="sMatchHeader__item">
      <div class="img-wrap">
        <NuxtImg :src="`/img/team-img-2.svg`" alt="Avatar" class="img" />
      </div>
      <div class="sMatchHeader__status">INTZ Genesis</div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
</script>
<style scoped lang="scss"></style>
