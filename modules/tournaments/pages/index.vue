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
  import { useBreadcrumbsStore } from '@/store/BreadcrumbStore';
  const breadcrumbsStore = useBreadcrumbsStore();

  const tournamentStore = useTournamentStore();

  definePageMeta({
    breadcrumbName: 'Турниры',
  });

  useSeoMeta({
    title: 'Турниры',
    // meta: [{ name: 'description', content: 'My amazing site.' }],
  });
  breadcrumbsStore.setNameFromIds();
</script>
