<template>
  <section class="sTournamentList">
    <div class="container">
      <div class="template template--header">
        <div class="btn-wrap template-wrap">
          <Button @click="active = 0" :class="active === 0 ? 'active' : ''"> Предстоящие </Button>
          <!-- v-if="teamsStore.myTeamsCount > 0" -->
          <Button @click="active = 1" :class="active === 1 ? 'active' : ''">
            Текущие
            <Badge value="1"></Badge>
          </Button>
          <Button @click="active = 2" :class="active === 2 ? 'active' : ''"> Завершенные </Button>
        </div>
      </div>
      <div class="template">
        <TabView v-model:activeIndex="active">
          <TabPanel>
            <div class="sMainContentBlock__row row">
              <TournamentsCard v-for="item of getLast" :newsData="item" />
            </div>
          </TabPanel>
          <TabPanel>
            <div class="sMainContentBlock__row row">
              <TournamentsCard v-for="item of tournamentsList" :newsData="item" />
            </div>
          </TabPanel>
          <TabPanel> Ended Tournaments </TabPanel>
        </TabView>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useTournamentStore } from '@/store/TournamentStore';

const tournamentStore = useTournamentStore();
const { getLast, tournamentsList } = storeToRefs(tournamentStore);
const active = ref(0);

onMounted(() => {
  tournamentStore.getAll();
  tournamentStore.getLastFetch();
});
</script>
