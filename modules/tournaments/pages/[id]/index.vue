<template>
  <Overview />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  import Overview from '@/modules/tournaments/components/Overview.vue';

  import { useRouter } from 'vue-router';
  const router = useRouter();
  const id = router.currentRoute.value.params.id;
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);
  console.log(id);
  if (id !== currentID.value) {
    tournamentStorePage.fetchData(id);
  }
</script>
