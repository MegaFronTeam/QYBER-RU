<template>
  <MainContentBlock
    id="tournamentsOther"
    :sectionTitle="sectionTitleTournamentsProps"
    :footerLink="footerLinkTournamentsProps"
  >
    <TournamentsCard
      v-for="item of getLast"
      :newsData="{
        id: item.id,
        title: item.title.rendered,
        date: item.post_date,
        excerpt: item.post_excerpt,
        thumbnail: item.post_thumbnail,
        teamCount: item.teamCount,
        // TODO: add max_team_count
        maxTeamCount: item.max_team_count,
        dateStart: item.date,
        prize_fund: item.prize_fundRub,
        // TODO: add formatted date
        formattedDate: item.formattedDate,
      }"
      :key="item.id"
    />
  </MainContentBlock>
</template>

<script lang="ts" setup>
  import { useTournamentStore } from '@/store/TournamentStore';
  const tournamentStore = useTournamentStore();
  const { getLast } = storeToRefs(tournamentStore);

  const sectionTitleTournamentsProps = {
    title: 'Ближайшие турниры',
    text: 'Ты лидер команды? Подай заявку на участие в ближайшем турнире!',
  };

  const footerLinkTournamentsProps = {
    text: 'Смотреть все турниры',
    href: '/',
  };
</script>

<style></style>
