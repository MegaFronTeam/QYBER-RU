<template>
  <div>
    <HeaderBlock
      :title="dataMatch.title?.rendered"
      :breadcrumbArr="breadcrumb"
      class="sHeaderBlock sHeaderBlock--detailed sHeaderBlock--match"
      :bg="data.post_thumbnail"
    >
      <span class="sHeaderBlock__date">{{ dataMatch.date }}</span>
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
                <div class="team-inner__name d-lg-none">
                  {{ dataMatch.a?.command.post_title }}
                </div>
                <div class="team-inner__wrap">
                  <PersonCard
                    v-if="dataMatch.a?.members"
                    v-for="(item, index) in dataMatch.a?.members"
                    :key="index"
                    :item="item"
                  />
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
                <div class="team-inner__name d-lg-none">
                  {{ dataMatch.b?.command.post_title }}
                </div>
                <div class="team-inner__wrap">
                  <!-- {{ dataMatch.b?.members }} -->
                  <PersonCard
                    v-if="dataMatch.b?.members"
                    v-for="(item, index) in dataMatch.b?.members"
                    :key="index"
                    :item="item"
                  />
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
      <div class="header-item">
        <JoinGameModal v-if="matchStore.isPlayerInMatch && dataMatch.status.value !== 'done'" />
        <MatchModal v-if="isReferee" :item="dataMatch" btnLabel="Настройки игры" />
      </div>
    </HeaderBlock>

    <section v-if="dataMatch.broadcast" class="sTournamentOverview sTournamentOverview--match">
      <div class="container">
        <div class="stream-container">
          <iframe
            :src="broadcastIframe"
            allow="clipboard-write; autoplay"
            frameborder="0"
            webkitAllowFullScreen
            mozallowfullscreen
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import type { commandInterface } from '@/modules/tournaments/interfaces/interface';

  import MatchHeader from '@/modules/tournaments/components/Match/MatchHeader.vue';
  import PersonCard from '@/modules/tournaments/components/Match/PersonCard.vue';
  import JoinGameModal from '@/modules/tournaments/components/Match/JoinGameModal.vue';
  import Broadcast from '@/modules/tournaments/components/Match/Broadcast.vue';
  import { useGlobalStore } from '~/store/globalStore';
  import MatchModal from '~/modules/tournaments/components/Grid/MatchModal.vue';
  const globalStore = useGlobalStore();
  const { isReferee, isUserAuth } = storeToRefs(globalStore);

  const { id } = useRoute().params;
  const tournamentID = useRoute().fullPath.split('/')[2];

  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const { currentID, data } = storeToRefs(tournamentPageStore);

  import { useMyMatchStore } from '~/modules/tournaments/store/MatchStore';
  const matchStore = useMyMatchStore();
  await matchStore.fetchData(id as string);

  const { dataMatch, broadcastIframe } = storeToRefs(matchStore);

  const isOpen = ref(true);
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  const breakpoint = 991;
  const isMobile = ref(window.innerWidth <= breakpoint);
  const updateIsMobile = () => {
    isMobile.value = window.innerWidth <= breakpoint;
  };

  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';
  const breadcrumbsStore = useBreadcrumbsStore();

  // const isAccessRole = computed(() => {
  //   if (globalStore.isUserAuth) {
  //     if (globalStore.userData.roles.includes('administrator')) return true;
  //     if (globalStore.userData.roles.includes('judge')) return true;

  //     return false;
  //   }
  //   return false;
  // });

  updateIsMobile();
  onMounted(() => {
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    if (tournamentID !== currentID.value || tournamentPageStore.currentID === '') {
      tournamentPageStore.fetchData(tournamentID).then(() => {
        // console.log(tournamentPageStore.data.title);
        // matchStore.dataTournament = tournamentPageStore.data;
        breadcrumbsStore.setNameFromIds(tournamentPageStore.data?.title);
      });
    }
  });
  onUnmounted(() => {
    updateIsMobile();
    window.removeEventListener('resize', updateIsMobile);
  });
</script>
