<template>
  <div>
    <HeaderBlock />

    <Overview />
    <MainContentBlock
      id="tournamentsOther"
      :sectionTitle="sectionTitleTournamentsProps"
      :footerLink="footerLinkTournamentsProps"
    >
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
    <!-- <h1>This is {{ $route.name }}</h1> -->
  </div>
</template>

<script setup>
  import Overview from '@/modules/tournaments/components/Overview.vue';
  import { useTournamentStore } from '@/store/TournamentStore';
  import { useGlobalStore } from '~/store/globalStore';
  import HeaderBlock from './HeaderBlock.vue';
  const tournamentStore = useTournamentStore();
  const globalStore = useGlobalStore();
  import axios from 'axios';

  const { id } = useRoute().params;
  const { data } = await axios.get(`https://api.qyber.ru/wp-json/wp/v2/tournaments/${id}`);

  definePageMeta({
    breadcrumbName: 'Турниры',
  });

  // const breadcrumb = ref([{ label: 'Турниры', route: '/' }, { label: 'Кибер Атланты Осень 2022' }]);

  const sectionTitleTournamentsProps = {
    title: 'Другие турниры',
    text: '',
  };
  const footerLinkTournamentsProps = {
    text: 'Смотреть все турниры',
    href: '/tournaments',
  };
</script>
