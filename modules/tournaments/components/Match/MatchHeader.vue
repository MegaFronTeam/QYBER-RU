<template>
  <div class="sMatchHeader">
    <div class="sMatchHeader__item">
      <div class="img-wrap">
        <img :src="`/img/team-img-1.png`" alt="Avatar" class="img" />
      </div>
      <div class="sMatchHeader__status">{{ dataMatch.command_a?.command.post_title }}</div>
    </div>
    <div class="sMatchHeader__item description">
      <p>VS</p>
      <span class="p-badge p-badge-gray">
        <!-- <svg-icon name="dota.svg" /> -->
        Dota 2
      </span>
      <div class="sMatchHeader__score h2">
        {{ dataMatch.command_a?.counter }} : {{ dataMatch.command_b?.counter }}
      </div>
      <p>{{ dataMatch.status?.label }}</p>
    </div>
    <div class="sMatchHeader__item">
      <div class="img-wrap">
        <img :src="`/img/team-img-2.svg`" alt="Avatar" class="img" />
      </div>
      <div class="sMatchHeader__status">{{ dataMatch.command_b?.command.post_title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMyMatchStore } from '~/modules/tournaments/store/MatchStore';
  const matchStore = useMyMatchStore();
  const { dataMatch } = storeToRefs(matchStore);
</script>
<style scoped lang="scss"></style>
