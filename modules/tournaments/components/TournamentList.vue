<template>
  <section class="sTournamentList">
    <div class="container">
      <div class="template template--header">
        <div class="btn-wrap template-wrap">
          <Button @click="clickOnTab(0)" :class="active === 0 ? 'active' : ''">
            Предстоящие
          </Button>
          <!-- v-if="teamsStore.myTeamsCount > 0" -->
          <Button @click="clickOnTab(1)" :class="active === 1 ? 'active' : ''">
            Текущие
            <!-- <Badge v-if="currentTournaments.length > 0" :value="currentTournaments.length" /> -->
          </Button>
          <Button @click="clickOnTab(2)" :class="active === 2 ? 'active' : ''">
            Завершенные
          </Button>
        </div>
      </div>
      <div class="template">
        <div class="sTournamentList__info">
          <InputSwitch
            v-model="checked"
            @click="clickOnStandings(checked)"
            class="sTournamentList__changeVision ms-auto"
          />
        </div>
        <TournamentListTabPanel :checked="checked" :tournamentsList="tournamentsList" />
      </div>
    </div>
  </section>
</template>
<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { useTournamentStore } from '@/store/TournamentStore';
  import TournamentListTabPanel from './TournamentListTabPanel.vue';

  const route = useRoute();
  const router = useRouter();
  const tournamentStore = useTournamentStore();
  const { tournamentsList } = storeToRefs(tournamentStore);

  const querryList = ref({
    tab: route.query.tab ? Number(route.query.tab) : 1,
    grid: route.query.grid ? Boolean(route.query.grid) : false,
  });
  const active = ref(querryList.value.tab);
  const checked = ref(querryList.value.grid);

  const clickOnTab = (id) => {
    active.value = id;
    router.push({
      query: { ...route.query, tab: id },
    });
  };

  const clickOnStandings = (state) => {
    router.push({
      query: { ...route.query, grid: state },
    });
  };

  // tournamentStore.getAll().then(() => {
  //   tournamentStore.getLastFetch();
  //   tournamentStore.sortTournamnts();
  // });
</script>
