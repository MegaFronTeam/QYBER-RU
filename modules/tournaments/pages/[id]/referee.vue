<template>
  <Referee />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  import Referee from '@/modules/tournaments/components/Referee.vue';

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
