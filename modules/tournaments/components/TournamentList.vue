<template>
  <section class="sTournamentList">
    <div class="container">
      <div class="template template--header">
        <div class="btn-wrap template-wrap">
          <Button
            @click="clickOnTab('nearest')"
            :class="queryList.time === 'nearest' ? 'active' : ''"
          >
            Предстоящие
          </Button>
          <!-- v-if="teamsStore.myTeamsCount > 0" -->
          <Button
            @click="clickOnTab('current')"
            :class="queryList.time === 'current' ? 'active' : ''"
          >
            Текущие
            <!-- <Badge v-if="currentTournaments.length > 0" :value="currentTournaments.length" /> -->
          </Button>
          <Button
            @click="clickOnTab('completed')"
            :class="queryList.time === 'completed' ? 'active' : ''"
          >
            Завершенные
          </Button>
        </div>
      </div>
      <div class="template">
        <div class="sTournamentList__info">
          <InputSwitch
            v-model="queryList.grid"
            @click="clickOnStandings(queryList.grid)"
            class="sTournamentList__changeVision ms-auto"
          />
        </div>
        <TournamentListTabPanel :checked="queryList.grid" :tournamentsList="tournamentsList" />
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

  const queryList = ref({
    time: route.query.time ? route.query.time : 'current',
    grid: route.query.grid ? Boolean(route.query.grid) : true,
  });

  fetchTournamentTime();

  function fetchTournamentTime(id) {
    router.push({
      query: { ...route.query, ...queryList.value },
    });
    let path = route.query;
    path.time = id ? id : queryList.value.time;
    path.grid;
    path = Object.keys(path)
      .map((key) => key + '=' + path[key])
      .join('&');
    tournamentStore.fetchTournaments('?' + path);
  }

  const clickOnTab = (id) => {
    queryList.value.time = id;

    fetchTournamentTime(id);
    // fetchTournamentTime();
  };

  const clickOnStandings = (state) => {
    queryList.value.grid = state;
    router.push({
      query: { ...route.query, grid: state },
    });
  };

  // tournamentStore.getAll().then(() => {
  //   tournamentStore.getLastFetch();
  //   tournamentStore.sortTournamnts();
  // });
</script>
