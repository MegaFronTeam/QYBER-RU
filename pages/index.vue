<template>
  <div>
    <MainHeader />
    <Welcome />
    <MainContentBlock id="tournaments" :sectionTitle="sectionTitleTournamentsProps">
      <TournamentsCard
        v-for="item of tournamentStore.getLast"
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
    <MainContentBlock :sectionTitle="sectionTitleNewsProps" :footerLink="footerLinkNewsProps">
      <NewsCard
        v-for="item of data"
        :newsData="{
          id: item.id,
          title: item.title.rendered,
          date: item.date,
          excerpt: item.excerpt.rendered,
          thumbnail: item.post_thumbnail,
        }"
        :key="item.id"
      />
    </MainContentBlock>
  </div>
</template>

<script setup>
  import { useTournamentStore } from '@/store/TournamentStore';
  const tournamentStore = useTournamentStore();

  const { data } = await useFetch(`https://api.qyber.ru/wp-json/wp/v2/posts`);

  const sectionTitleTournamentsProps = {
    title: 'Ближайшие турниры',
    text: 'Ты лидер команды? Подай заявку на участие в ближайшем турнире!',
  };
  const footerLinkTournamentsProps = {
    text: 'Смотреть все турниры',
    href: '/',
  };
  const sectionTitleNewsProps = {
    title: 'Последние новости',
    text: 'Актуальные новости киберспортивных турниров от QYBER.RU',
  };
  const footerLinkNewsProps = {
    text: 'Смотреть все новости',
    href: '/news',
  };
</script>
