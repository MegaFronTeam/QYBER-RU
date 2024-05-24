<template>
  <div>
    <HeaderBlock
      title="Кибер Атланты Осень 2022"
      :breadcrumbArr="breadcrumb"
      bg="/img/headerBlock-bg-7.jpg"
      class="sHeaderBlock sHeaderBlock--detailed"
    >
      <div class="header-item sTournamentOverview--match">
        <template v-if="isMobile">
          <MatchHeader />
        </template>
        <div class="d-lg-none table-title">Список игроков</div>
        <div class="header-row row">
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
      </div>
      <div class="header-item">
        <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
          <Button label="Подключиться к игре" class="w-full" />
        </NuxtLink>
      </div>
    </HeaderBlock>
    <TournamentMatch />
    <!-- <h1>This is {{ $route.name }}</h1> -->
  </div>
</template>

<script setup>
  import { useTournamentStore } from '@/store/TournamentStore';
  import { useGlobalStore } from '~/store/globalStore';
  const tournamentStore = useTournamentStore();
  const globalStore = useGlobalStore();

  const breadcrumb = ref([
    {
      label: 'Турниры', route: '/'
    }, {
      label: 'Кибер Атланты Осень 2022', route: '/'
    }, {
      label: 'Кибер Атланты Осень 2022 - Игра №4'
    }
  ]);

  const breakpoint = 991
  const isMobile = ref(window.innerWidth <= breakpoint)
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= breakpoint
  }

  updateIsMobile()
  onMounted(() => {
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile)
  })
  onUnmounted(() => {
    updateIsMobile()
    window.removeEventListener('resize', updateIsMobile)
  })
</script>
