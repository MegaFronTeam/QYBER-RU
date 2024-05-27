<template>
  <Overview />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  import Overview from '@/modules/tournaments/components/Overview.vue';

  import { useRoute } from 'vue-router';
  const { id } = useRoute().params;
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);
  if (id !== currentID.value) {
    tournamentStorePage.fetchData(id);
  }
</script>
