<template>
  <MainContentBlock
    id="tournamentsOther"
    :sectionTitle="sectionTitleTournamentsProps"
    :footerLink="footerLinkTournamentsProps"
  >
    <TournamentsCard v-for="item of tournamentsList" :newsData="item" />
  </MainContentBlock>
</template>

<script lang="ts" setup>
  import { useTournamentStore } from '@/store/TournamentStore';

  const tournamentStore = useTournamentStore();
  const { tournamentsList } = storeToRefs(tournamentStore);
  tournamentStore.fetchTournaments('?time=nearest&per_page=8');

  const sectionTitleTournamentsProps = {
    title: 'Предстоящие',
    text: 'Ты лидер команды? Подай заявку на участие в ближайшем турнире!',
  };

  const footerLinkTournamentsProps = {
    text: 'Смотреть все турниры',
    href: '/tournaments',
  };
</script>

<style></style>
