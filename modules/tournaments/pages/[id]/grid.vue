<template>
  <Grid />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  import { useRoute } from 'vue-router';
  const { id } = useRoute().params;
  import Grid from '@/modules/tournaments/components/Grid.vue';
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);
  if (id !== currentID.value) {
    tournamentStorePage.fetchData(id);
  }
</script>
