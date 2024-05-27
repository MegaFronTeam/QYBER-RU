<template>
  <Schedule />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  import Schedule from '@/modules/tournaments/components/Schedule.vue';

  import { useRoute } from 'vue-router';
  const { id } = useRoute().params;

  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);

  if (id !== currentID.value) {
    tournamentStorePage.fetchData(id);
  }
</script>
