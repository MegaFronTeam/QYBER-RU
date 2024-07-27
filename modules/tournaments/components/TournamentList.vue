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
            v-model="queryList.table"
            @change="clickOnStandings(queryList.table)"
            class="sTournamentList__changeVision ms-auto"
          />
        </div>
        <!-- v-if="tournamentsList.length" -->
        <TournamentListTabPanel :checked="queryList.table" :tournamentsList="tournamentsList" />
        <!-- <template v-else> ничего не найдено </template> -->
      </div>
    </div>
  </section>
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import { useTournamentStore } from '@/store/TournamentStore';
  import TournamentListTabPanel from './TournamentListTabPanel.vue';
  import { useRoute, useRouter } from 'vue-router';

  const route = useRoute();
  const router = useRouter();
  const tournamentStore = useTournamentStore();
  const { tournamentsList } = storeToRefs(tournamentStore);

  const query = ref(route.query);

  const queryList = ref({});
  queryList.value = {
    time: query.value.time ? query.value.time : 'current',
    table: route.query.table === 'true' ? true : false,
  };

  async function fetchTournaments(state) {
    let path = route.query;
    if (state) {
      path.time = state;
    } else {
      path.time = queryList.value.time;
    }
    path = new URLSearchParams(route.query).toString();

    await tournamentStore.fetchTournaments(`?${path}`);
  }
  onMounted(() => {
    fetchTournaments().then(() => {
      if (tournamentsList.value.length === 0) {
        // nearest

        // current
        fetchTournaments('nearest').then(() => {
          queryList.value.time = 'nearest';
          if (tournamentsList.value.length === 0) {
            queryList.value.time = 'completed';
            fetchTournaments('completed');
          }
        });
      }
    });
  });

  const clickOnTab = (state) => {
    queryList.value.time = state;

    router.push({
      query: { ...route.query, time: state },
    });
    fetchTournaments(state);
  };

  const clickOnStandings = (state) => {
    queryList.value.table = state;
    console.log(queryList.value.table, state);
    router.push({
      query: { ...route.query, table: state },
    });
  };
</script>
