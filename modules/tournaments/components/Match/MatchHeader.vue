<template>
  <div class="sMatchHeader">
    <div class="sMatchHeader__item">
      <RouterLink class="sMatchHeader__item-inner" :to="'/ratings/team-' + dataMatch.a?.command.ID">
        <div class="img-wrap">
          <img :src="dataMatch.a?.command.post_thumbnail" alt="Avatar" class="img" />
        </div>
        <div class="sMatchHeader__status">{{ dataMatch.a?.command.post_title }}</div>
        <span>
          {{ dataMatch.a?.command.company || dataMatch.a?.command.educational_institution.name }}
        </span>
      </RouterLink>
    </div>
    <div class="sMatchHeader__item description">
      <p>VS</p>
      <span class="p-badge p-badge-gray" v-if="data.discipline">
        <!-- <svg-icon name="dota.svg" /> -->

        <img :src="disciplineIcon" alt="" />
        {{ data.discipline[0].name }}
      </span>
      <div class="sMatchHeader__score h2">
        {{ dataMatch.a?.counter }} : {{ dataMatch.b?.counter }}
      </div>
      <p>{{ dataMatch.status?.label }}</p>
    </div>
    <div class="sMatchHeader__item">
      <RouterLink class="sMatchHeader__item-inner" :to="'/ratings/team-' + dataMatch.b?.command.ID">
        <div class="img-wrap">
          <img :src="dataMatch.b?.command.post_thumbnail" alt="" class="img" />
        </div>
        <div class="sMatchHeader__status">{{ dataMatch.b?.command.post_title }}</div>
        <span class="">{{
          dataMatch.b?.command.company || dataMatch.b?.command.educational_institution.name
        }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
const tournamentPageStore = useTournamentPageStore();
const { data, disciplineIcon } = storeToRefs(tournamentPageStore);

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
.sMatchHeader__item-inner {
  color: inherit;
}
</style>
