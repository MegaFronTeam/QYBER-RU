<template>
  <Grid />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  const router = useRouter();
  const id = router.currentRoute.value.params.id;
  import Grid from '@/modules/tournaments/components/Grid.vue';
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);
  if (id !== currentID.value) {
    tournamentStorePage.fetchData(id);
  }
</script>
