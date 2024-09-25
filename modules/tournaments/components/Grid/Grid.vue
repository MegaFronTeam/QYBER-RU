<template>
  <div class="sTournamentOverview--grid">
    <div class="wrap-body">
      <div class="bg-block">
        <div class="bg-block-panel">
          <div class="tournament-table__item" v-if="data.winners">
            <div class="tournament-table__item-title">Победители</div>
            <div class="tournament-table__winner-row row">
              <div
                class="col-auto"
                v-for="(item, index) in data.winners"
                :key="index"
                :style="{ order: item.position }"
              >
                <div class="sGridCardItem sGridCardItem--winner">
                  <div class="teams-group">
                    <div
                      class="sGridCard sGridCard__team"
                      :class="+item.position === 1 ? 'team-winner' : ''"
                    >
                      <div class="sGridCard__score">{{ item.position }}</div>
                      <div class="sGridCard__wrap">
                        <img v-if="item.avatar" :src="item.avatar" alt="Avatar" class="img" />
                        <span>{{ item.team.post_title }}</span>
                      </div>
                    </div>
                    <div class="sGridCard__price">
                      Приз: {{ data.prize[+item.position - 1].amount }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tournament-table bg-block-panel">
          <div>
            <div class="tournament-table__item">
              <!-- <div class="tournament-table__item-title">Верхняя сетка</div> -->
              <div class="tournament-table__title-row row">
                <div
                  class="tournament-table__title-col col-auto"
                  v-for="(item, index) in data.stages_labels"
                  :key="index"
                >
                  <p>{{ item.name }} ({{ item.subname.label }})</p>
                </div>
              </div>
              <div class="tournament-table__row row" v-if="matchesGrid && matchesGrid.length > 0">
                <div
                  class="tournament-table__col col-auto"
                  v-for="(match, index) in matchesGrid"
                  :key="index"
                >
                  <!-- {{ index + 1 === matchesGrid.length ? 'asd' : '' }} -->
                  <template v-for="(item, indexSub) in match" :key="item.id">
                    <div class="tournament-table__group" v-if="indexSub % 2 === 0">
                      <Card :item="match[indexSub]" :index="indexSub" />
                      <span
                        v-if="index + 1 === matchesGrid.length && match.length === 2"
                        class="mt-2 mb-2"
                      >
                        Матч за 3 место
                      </span>
                      <!-- {{ match[indexSub + 1].status.value }} -->
                      <Card
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
        </div>

        <div
          class="tournament-table bg-block-panel"
          v-if="matchesDoubleGrid && matchesDoubleGrid.length > 0"
        >
          <div>
            <div class="tournament-table__item">
              <div class="tournament-table__item-title">Нижняя сетка</div>
              <!-- <div class="tournament-table__title-row row">
                <div
                  class="tournament-table__title-col col-auto"
                  v-for="(item, index) in data.stages_labels"
                  :key="index"
                >
                  <p>{{ item.name }} ({{ item.subname.label }})</p>
                </div>
              </div> -->
              <div
                class="tournament-table__row row"
                v-if="matchesDoubleGrid && matchesDoubleGrid.length > 0"
              >
                <div
                  class="tournament-table__col col-auto"
                  v-for="(match, index) in matchesDoubleGrid"
                  :key="index"
                >
                  <!-- {{ index + 1 === matchesGrid.length ? 'asd' : '' }} -->
                  <template v-for="(item, indexSub) in match" :key="item.id">
                    <div class="tournament-table__group" v-if="indexSub % 2 === 0">
                      <Card :item="item" :index="indexSub" />
                      <span
                        v-if="index + 1 === matchesGrid.length && match.length === 2"
                        class="mt-2 mb-2"
                      >
                        Матч за 3 место
                      </span>
                      <Card
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Card from './Card.vue';
  import { useTournamentPageStore } from '~/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const { data, matchesGrid, matchesDoubleGrid } = storeToRefs(tournamentPageStore);
  console.log(matchesGrid.value);
</script>
