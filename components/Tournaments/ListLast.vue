<template>
  <MainContentBlock
    id="tournamentsOther"
    :sectionTitle="sectionTitleTournamentsProps"
    :footerLink="footerLinkTournamentsProps"
  >
    <TournamentsCard v-for="item of getLast" :newsData="item" />
  </MainContentBlock>
</template>

<script lang="ts" setup>
import { useTournamentStore } from '@/store/TournamentStore';

const tournamentStore = useTournamentStore();
const { getLast } = storeToRefs(tournamentStore);

tournamentStore.getLastFetch();

const sectionTitleTournamentsProps = {
  title: 'Ближайшие турниры',
  text: 'Ты лидер команды? Подай заявку на участие в ближайшем турнире!',
};

const footerLinkTournamentsProps = {
  text: 'Смотреть все турниры',
  href: '/tournaments',
};
</script>

<style></style>
