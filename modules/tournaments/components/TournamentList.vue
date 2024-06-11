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
        <div class="sTournamentList__info">
          <span>
            {{
              active === 0
                ? upcomingTournaments.length
                : active === 1
                ? currentTournaments.length
                : endedTournaments.length
            }}
          </span>
          <InputSwitch v-model="checked" class="sTournamentList__changeVision ms-auto" />
        </div>
        <TabView v-model:activeIndex="active">
          <TabPanel>
            <DataTable v-if="checked" :value="upcomingTournaments" removableSort>
              <Column field="tournament" header="Турнир">
                <template #body="slotProps">
                  <NuxtLink :to="'/tournaments/' + slotProps.data.id">
                    {{ slotProps.data.title }}
                  </NuxtLink>
                </template>
              </Column>
              <Column field="tournament" header="Начало">
                <template #body="slotProps">
                  {{ slotProps.data.date }}
                </template>
              </Column>
              <Column field="tournament" header="Лига">
                <template #body="slotProps">
                  <span
                    v-if="slotProps.data.discipline"
                    v-for="discipline in slotProps.data.discipline"
                    class="p-badge p-badge-gray"
                  >
                    {{ discipline.name }}
                  </span>
                </template>
              </Column>
              <Column field="tournament" header="Дисциплина">
                <template #body="slotProps">
                  <Badge
                    v-if="slotProps.data.leagues"
                    v-for="league in slotProps.data.leagues"
                    :severity="league.name == 'QYBER Атланты' ? 'secondary' : 'danger'"
                    class="p-badge-outline"
                    :value="league.name"
                  />
                </template>
              </Column>
              <Column field="tournament" header="Участники">
                <template #body="slotProps">
                  {{ slotProps.data.max_commands }}
                </template>
              </Column>
              <Column field="tournament" header="Фонд">
                <template #body="slotProps">
                  {{ slotProps.data.prize_fund }}
                </template>
              </Column>
            </DataTable>
            <div v-else class="sMainContentBlock__row row">
              <TournamentsCard v-for="item of upcomingTournaments" :newsData="item" />
            </div>
          </TabPanel>
          <TabPanel>
            <DataTable v-if="checked" :value="currentTournaments" removableSort>
              <Column field="tournament" header="Турнир">
                <template #body="slotProps">
                  <NuxtLink :to="'/tournaments/' + slotProps.data.id">
                    {{ slotProps.data.title }}
                  </NuxtLink>
                </template>
              </Column>
              <Column field="tournament" header="Начало">
                <template #body="slotProps">
                  {{ slotProps.data.date }}
                </template>
              </Column>
              <Column field="tournament" header="Лига">
                <template #body="slotProps">
                  <span
                    v-if="slotProps.data.discipline"
                    v-for="discipline in slotProps.data.discipline"
                    class="p-badge p-badge-gray"
                  >
                    {{ discipline.name }}
                  </span>
                </template>
              </Column>
              <Column field="tournament" header="Дисциплина">
                <template #body="slotProps">
                  <Badge
                    v-if="slotProps.data.leagues"
                    v-for="league in slotProps.data.leagues"
                    :severity="league.name == 'QYBER Атланты' ? 'secondary' : 'danger'"
                    class="p-badge-outline"
                    :value="league.name"
                  />
                </template>
              </Column>
              <Column field="tournament" header="Участники">
                <template #body="slotProps">
                  {{ slotProps.data.max_commands }}
                </template>
              </Column>
              <Column field="tournament" header="Фонд">
                <template #body="slotProps">
                  {{ slotProps.data.prize_fund }}
                </template>
              </Column>
            </DataTable>
            <div v-else class="sMainContentBlock__row row">
              <TournamentsCard v-for="item of currentTournaments" :newsData="item" />
            </div>
          </TabPanel>
          <TabPanel>
            <DataTable v-if="checked" :value="endedTournaments" removableSort>
              <Column field="tournament" header="Турнир">
                <template #body="slotProps">
                  <NuxtLink :to="'/tournaments/' + slotProps.data.id">
                    {{ slotProps.data.title }}
                  </NuxtLink>
                </template>
              </Column>
              <Column field="tournament" header="Начало">
                <template #body="slotProps">
                  {{ slotProps.data.date }}
                </template>
              </Column>
              <Column field="tournament" header="Лига">
                <template #body="slotProps">
                  <span
                    v-if="slotProps.data.discipline"
                    v-for="discipline in slotProps.data.discipline"
                    class="p-badge p-badge-gray"
                  >
                    {{ discipline.name }}
                  </span>
                </template>
              </Column>
              <Column field="tournament" header="Дисциплина">
                <template #body="slotProps">
                  <Badge
                    v-if="slotProps.data.leagues"
                    v-for="league in slotProps.data.leagues"
                    :severity="league.name == 'QYBER Атланты' ? 'secondary' : 'danger'"
                    class="p-badge-outline"
                    :value="league.name"
                  />
                </template>
              </Column>
              <Column field="tournament" header="Участники">
                <template #body="slotProps">
                  {{ slotProps.data.max_commands }}
                </template>
              </Column>
              <Column field="tournament" header="Фонд">
                <template #body="slotProps">
                  {{ slotProps.data.prize_fund }}
                </template>
              </Column>
            </DataTable>
            <div v-else class="sMainContentBlock__row row">
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
const checked = ref(false);

console.log(upcomingTournaments.value);

tournamentStore.getAll().then(() => {
  tournamentStore.sortTournamnts();
});
</script>
