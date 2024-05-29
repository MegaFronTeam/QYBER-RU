<template>
  <div class="sTournamentOverview--grid">
    <div class="wrap-body">
      <div class="bg-block">
        <div class="bg-block-panel">
          <div class="tournament-table__item">
            <div class="tournament-table__item-title">Победители</div>
            <div class="tournament-table__winner-row row">
              <div class="col-auto">
                <div class="sGridCardItem sGridCardItem--winner">
                  <div class="teams-group">
                    <div class="sGridCard sGridCard__team team-winner">
                      <div class="sGridCard__score">1</div>
                      <div class="sGridCard__wrap">
                        <NuxtImg :src="`/img/teamGrid-1.png`" alt="Avatar" class="img" />
                        <span>Команда 1</span>
                      </div>
                    </div>
                    <div class="sGridCard__price">Приз: 200 000 ₽</div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="sGridCardItem sGridCardItem--winner">
                  <div class="teams-group">
                    <div class="sGridCard sGridCard__team">
                      <div class="sGridCard__score">2</div>
                      <div class="sGridCard__wrap">
                        <NuxtImg :src="`/img/teamGrid-1.png`" alt="Avatar" class="img" />
                        <span>Команда 1</span>
                      </div>
                    </div>
                    <div class="sGridCard__price">Приз: 100 000 ₽</div>
                  </div>
                </div>
              </div>
              <div class="col-auto">
                <div class="sGridCardItem sGridCardItem--winner">
                  <div class="teams-group">
                    <div class="sGridCard sGridCard__team">
                      <div class="sGridCard__score">3</div>
                      <div class="sGridCard__wrap">
                        <NuxtImg :src="`/img/teamGrid-1.png`" alt="Avatar" class="img" />
                        <span>Команда 1</span>
                      </div>
                    </div>
                    <div class="sGridCard__price">Приз: 50 000 ₽</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tournament-table bg-block-panel">
          <div class="tournament-table__item">
            <!-- <div class="tournament-table__item-title">Верхняя сетка</div> -->
            <div class="tournament-table__title-row row">
              <div class="tournament-table__title-col col-auto">
                <p>Раунд 1 (Online)</p>
              </div>
              <div class="tournament-table__title-col col-auto">
                <p>Раунд 2 (Online)</p>
              </div>
              <div class="tournament-table__title-col col-auto">
                <p>Раунд 3 (LAN)</p>
              </div>
              <div class="tournament-table__title-col col-auto">
                <p>Раунд 4 (LAN)</p>
              </div>
              <div class="tournament-table__title-col col-auto">
                <p>Финал (LAN)</p>
              </div>
            </div>
            <div class="tournament-table__row row">
              <div
                class="tournament-table__col col-auto"
                v-for="(match, index) in data.matches"
                :key="index"
              >
                <template v-for="(item, indexSub) in match" :key="item.id">
                  <div class="tournament-table__group" v-if="indexSub % 2 === 0">
                    <GridCard :item="item" :index="indexSub" />
                    <GridCard
                      v-if="match[indexSub + 1]"
                      :item="match[indexSub + 1]"
                      :index="indexSub + 1"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="tournament-table__item" v-if="lastGrid">
          <div class="tournament-table__item-title">Нижняя сетка</div>
          <div class="tournament-table__title-row row">
            <div class="tournament-table__title-col col-auto">
              <p>Раунд 1 (Online)</p>
            </div>
            <div class="tournament-table__title-col col-auto">
              <p>Раунд 2 (Online)</p>
            </div>
            <div class="tournament-table__title-col col-auto">
              <p>Раунд 3 (LAN)</p>
            </div>
            <div class="tournament-table__title-col col-auto">
              <p>Раунд 4 (LAN)</p>
            </div>
            <div class="tournament-table__title-col col-auto">
              <p>Раунд 5 (LAN)</p>
            </div>
            <div class="tournament-table__title-col col-auto">
              <p>Раунд 6 (LAN)</p>
            </div>
          </div>
          <div class="tournament-table__row row row-low">
            <div class="tournament-table__col col-auto">
              <div class="tournament-table__group tournament-table__group--single">
                <GridCard />
              </div>
              <div class="tournament-table__group tournament-table__group--single">
                <GridCard />
              </div>
              <div class="tournament-table__group tournament-table__group--single">
                <GridCard />
              </div>
              <div class="tournament-table__group tournament-table__group--single">
                <GridCard />
              </div>
            </div>
            <div class="tournament-table__col col-auto">
              <div class="tournament-table__group">
                <GridCard />
                <GridCard />
              </div>
              <div class="tournament-table__group">
                <GridCard />
                <GridCard />
              </div>
            </div>
            <div class="tournament-table__col col-auto">
              <div class="tournament-table__group tournament-table__group--small">
                <GridCard />
              </div>
              <div class="tournament-table__group tournament-table__group--small">
                <GridCard />
              </div>
            </div>
            <div class="tournament-table__col col-auto">
              <div class="tournament-table__group">
                <GridCard />
                <GridCard />
              </div>
            </div>
            <div class="tournament-table__col col-auto">
              <div class="tournament-table__group tournament-table__group--small">
                <GridCard />
              </div>
            </div>
            <div class="tournament-table__col col-auto">
              <div class="tournament-table__group">
                <GridCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="wrap-footer d-lg-none">
      <div class="template template--footer">
        <Paginator
          :rows="rowsPerPage[0]"
          :totalRecords="totalRecords"
          :rowsPerPageOptions="rowsPerPage"
          :pageLinkSize="4"
        >
          <template #start="slotProps">
            Показано от {{ slotProps.state.page * slotProps.state.rows + 1 }} до
            {{
              slotProps.state.first + slotProps.state.rows > totalRecords
                ? totalRecords
                : slotProps.state.first + slotProps.state.rows
            }}
            из {{ totalRecords }} данных
          </template>
        </Paginator>
      </div>
    </div> -->
  </div>
</template>

<script setup>
  import GridCard from './GridCard.vue';
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const { data } = storeToRefs(tournamentPageStore);

  // const active = ref(1);
  // const products = ref([
  //   {
  //     team: {
  //       avatar: 'team-img-1.png',
  //       text: 'Team Rogue',
  //     },
  //     organisation: {
  //       label: 'ООО Датекс Софт',
  //     },
  //     registration: 'вт, 30 января в 15:34',
  //   },
  //   {
  //     team: {
  //       avatar: 'team-img-2.svg',
  //       text: 'INTZ Genesis',
  //     },
  //     organisation: {
  //       label: 'ООО Датекс Софт',
  //     },
  //     registration: 'вт, 30 января в 15:34',
  //   },
  //   {
  //     team: {
  //       avatar: 'team-img-1.png',
  //       text: 'Team Rogue',
  //     },
  //     organisation: {
  //       label: 'ООО Датекс Софт',
  //     },
  //     registration: 'вт, 30 января в 15:34',
  //   },
  // ]);

  // const totalRecords = ref(10);
  // const rowsPerPage = ref([5, 10, 50, 100]);
</script>
