<template>
  <div>
    <HeaderBlock
      title="Кибер Атланты Осень 2022"
      :breadcrumbArr="breadcrumb"
      bg="/img/headerBlock-bg-8.jpg"
      class="sHeaderBlock sHeaderBlock--detailed sHeaderBlock--match"
    >
      <div class="header-item sTournamentOverview--match">
        <template v-if="isMobile">
          <MatchHeader />
        </template>
        <div class="d-lg-none table-title" @click="toggle">
          Список игроков <svg-icon v-if="isOpen" name="arrow-up-sm" /><svg-icon
            v-if="!isOpen"
            name="arrow-down-sm"
          />
        </div>
        <Transition name="accordion">
          <div class="header-row row" v-show="isOpen">
            <div class="col">
              <div class="team-inner">
                <div class="team-inner__name d-lg-none">Team Rogue</div>
                <div class="team-inner__wrap">
                  <PersonCard v-for="index in 6" :key="index" />
                </div>
              </div>
            </div>
            <div class="col-auto">
              <template v-if="!isMobile">
                <MatchHeader />
              </template>
            </div>
            <div class="col">
              <div class="team-inner">
                <div class="team-inner__name d-lg-none">INTZ Genesis</div>
                <div class="team-inner__wrap">
                  <PersonCard v-for="index in 6" :key="index" />
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <div class="header-item">
        <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
          <Button label="Подключиться к игре" class="w-full" />
        </NuxtLink>
      </div>
    </HeaderBlock>
    <TournamentsMatch />
    <!-- <h1>This is {{ $route.name }}</h1> -->
  </div>
</template>

<script setup>
import { useTournamentStore } from '@/store/TournamentStore';
import { useGlobalStore } from '~/store/globalStore';
const tournamentStore = useTournamentStore();
const globalStore = useGlobalStore();

import { useRoute } from 'vue-router';
const { id } = useRoute().params;

import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
const tournamentStorePage = useTournamentPageStore();
const { currentID } = storeToRefs(tournamentStorePage);

const isOpen = ref(true);
const toggle = () => {
  isOpen.value = !isOpen.value;
};

const breadcrumb = ref([
  {
    label: 'Турниры',
    route: '/',
  },
  {
    label: 'Кибер Атланты Осень 2022',
    route: '/',
  },
  {
    label: 'Кибер Атланты Осень 2022 - Игра №4',
  },
]);

const breakpoint = 991;
const isMobile = ref(window.innerWidth <= breakpoint);
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= breakpoint;
};

import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

const breadcrumbsStore = useBreadcrumbsStore();

updateIsMobile();
onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);

  if (id !== currentID.value) {
    tournamentStorePage.fetchData(id).then(() => {
      // console.log(tournamentStorePage.data.title);
      breadcrumbsStore.setNameFromIds(tournamentStorePage.data.title);
    });
  }
});
onUnmounted(() => {
  updateIsMobile();
  window.removeEventListener('resize', updateIsMobile);
});
</script>
