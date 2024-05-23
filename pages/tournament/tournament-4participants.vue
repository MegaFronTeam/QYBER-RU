<template>
  <div>
    <HeaderBlock
      title="Кибер Атланты Осень 2022"
      :breadcrumbArr="breadcrumb"
      bg="/img/headerBlock-bg-7.jpg"
      class="sHeaderBlock sHeaderBlock--detailed"
    >
      <div class="header-item">
        <div class="data-start"><span>До начала турнира:</span></div>
        <div class="timer">
          <div class="timer__item">
            <span>00</span>
            <p>Дней</p>
          </div>
          <div class="timer__item">
            <span>00</span>
            <p>Часов</p>
          </div>
          <div class="timer__item">
            <span>00</span>
            <p>Минут</p>
          </div>
        </div>
      </div>
      <div class="header-item">
        <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
          <Button label="Регистрация на турнир" class="w-full" />
        </NuxtLink>
      </div>
      <div class="header-item">
        <div class="steps-wrap">
          <div class="step step_active">
            <p><span>Анонсирован</span></p>
            <p>28 января 2024 г. в 14:00</p>
          </div>
          <div class="step">
            <p><span>Регистрация</span></p>
            <p>28 января 2024 г. в 14:00 - 28 февраля 2024 в 14:00</p>
          </div>
          <div class="step">
            <p><span>Проведение турнира</span></p>
            <p>10 марта 2024 г. в 17:00</p>
          </div>
        </div>
      </div>
    </HeaderBlock>
    <TournamentParticipants />
    <MainContentBlock
      id="tournamentsOther"
      :sectionTitle="sectionTitleTournamentsProps"
      :footerLink="footerLinkTournamentsProps"
    >
      <TournamentCard
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
  import { useTournamentStore } from '@/store/TournamentStore';
  import { useGlobalStore } from '~/store/globalStore';
  const tournamentStore = useTournamentStore();
  const globalStore = useGlobalStore();

  const breadcrumb = ref([{ label: 'Турниры', route: '/' }, { label: 'Кибер Атланты Осень 2022' }]);

  const sectionTitleTournamentsProps = {
    title: 'Другие турниры',
    text: '',
  };
  const footerLinkTournamentsProps = {
    text: 'Смотреть все турниры',
    href: '/tournaments',
  };
</script>
