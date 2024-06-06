<template>
  <!-- <div class="container">
    <h1>Турниры</h1>
  </div> -->

  <TournamentsListLast />
</template>
<script setup>
  definePageMeta({
    breadcrumbName: 'Турниры',
  });
  import { useTournamentStore } from '~/store/TournamentStore';
  const tournamentStore = useTournamentStore();
  tournamentStore.getLastFetch();
</script>
