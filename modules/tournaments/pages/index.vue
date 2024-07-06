<template>
  <div>
    <HeaderBlock title="Турниры" bg="/img/headerBlock-bg-9.jpg" class="sHeaderBlock">
      <ShareFilterBlock :fetchMethod="tournamentStore.fetchTournaments" :firstAction="false" />
    </HeaderBlock>
    <TournamentList />
  </div>

  <!-- <TournamentsListLast /> -->
</template>
<script setup>
  import TournamentList from '../components/TournamentList.vue';
  import { useTournamentStore } from '@/store/TournamentStore';

  const tournamentStore = useTournamentStore();

  definePageMeta({
    breadcrumbName: 'Турниры',
  });
</script>
