<template>
  <section class="sTournamentList">
    <div class="container">
      <div class="template template--header">
        <div class="btn-wrap template-wrap">
          <Button @click="active = 0" :class="active === 0 ? 'active' : ''"> Предстоящие </Button>
          <!-- v-if="teamsStore.myTeamsCount > 0" -->
          <Button @click="active = 1" :class="active === 1 ? 'active' : ''">
            Текущие
            <Badge v-if="currentTournaments.length > 0" :value="currentTournaments.length" />
          </Button>
          <Button @click="active = 2" :class="active === 2 ? 'active' : ''"> Завершенные </Button>
        </div>
      </div>
      <div class="template">
        <TabView v-model:activeIndex="active">
          <TabPanel>
            <div class="sMainContentBlock__row row">
              <TournamentsCard v-for="item of upcomingTournaments" :newsData="item" />
            </div>
          </TabPanel>
          <TabPanel>
            <div class="sMainContentBlock__row row">
              <TournamentsCard v-for="item of currentTournaments" :newsData="item" />
            </div>
          </TabPanel>
          <TabPanel>
            <div class="sMainContentBlock__row row">
              <TournamentsCard v-for="item of endedTournaments" :newsData="item" />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useTournamentStore } from '@/store/TournamentStore';

const tournamentStore = useTournamentStore();
const { upcomingTournaments, currentTournaments, endedTournaments } = storeToRefs(tournamentStore);
const active = ref(1);

tournamentStore.getAll().then(() => {
  tournamentStore.sortTournamnts();
});
// onMounted(() => {
// });
</script>
