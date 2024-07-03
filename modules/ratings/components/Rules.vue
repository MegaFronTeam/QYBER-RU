<template>
  <div class="wrap-body">
    <div class="sTournamentOverview__title-item">
      <div v-html="data.regulations"></div>
    </div>
  </div>
</template>

<script setup>
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { data } = storeToRefs(tournamentStorePage);
</script>
