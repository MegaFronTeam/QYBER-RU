<template>
  <MainContentBlock
    id="tournamentsOther"
    :sectionTitle="sectionTitleTournamentsProps"
    :footerLink="footerLinkTournamentsProps"
  >
    <TournamentsCard
      v-for="item of [...tournamentsList, ...SecondtournamentsList]"
      :newsData="item"
    />
  </MainContentBlock>
</template>

<script lang="ts" setup>
  import { useTournamentStore } from '@/store/TournamentStore';

  const tournamentStore = useTournamentStore();
  const { tournamentsList, SecondtournamentsList } = storeToRefs(tournamentStore);
  tournamentStore.fetchTournaments('?time=nearest&per_page=8');
  tournamentStore.fetchTournamentsSecond('?time=current&per_page=8');

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
