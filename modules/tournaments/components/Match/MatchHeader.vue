<template>
  <div class="sMatchHeader">
    <div class="sMatchHeader__item">
      <div class="sMatchHeader__item-inner">
        <div class="img-wrap">
          <img :src="dataMatch.a?.command.post_thumbnail" alt="Avatar" class="img" />
        </div>
        <div class="sMatchHeader__status">{{ dataMatch.a?.command.post_title }}</div>
      </div>
    </div>
    <div class="sMatchHeader__item description">
      <p>VS</p>
      <span class="p-badge p-badge-gray" v-if="data.discipline">
        <!-- <svg-icon name="dota.svg" /> -->
        {{ data.discipline[0].name }}
      </span>
      <div class="sMatchHeader__score h2">
        {{ dataMatch.a?.counter }} : {{ dataMatch.b?.counter }}
      </div>
      <p>{{ dataMatch.status?.label }}</p>
    </div>
    <div class="sMatchHeader__item">
      <div class="sMatchHeader__item-inner">
        <div class="img-wrap">
          <img :src="dataMatch.b?.command.post_thumbnail" alt="Avatar" class="img" />
        </div>
        <div class="sMatchHeader__status">{{ dataMatch.b?.command.post_title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
const tournamentPageStore = useTournamentPageStore();
const { data } = storeToRefs(tournamentPageStore);

import { useMyMatchStore } from '@/modules/tournaments/store/MatchStore';
const matchStore = useMyMatchStore();
const { dataMatch } = storeToRefs(matchStore);
</script>
<style scoped lang="scss">
.img-wrap {
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    flex: 0 0 auto;
  }
}
</style>
