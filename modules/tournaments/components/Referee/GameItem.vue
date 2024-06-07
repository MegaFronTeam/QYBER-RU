<template>
  <Button
    v-if="item === null"
    outlined
    class="btn-add-team w-full active-btn dashed secondary"
    @click="
      showRegModal = true;
      ifReferee = true;
      tournamentPageStore.indexGroupStore = +indexGroup;
      tournamentPageStore.indexCoupleStore = +indexCouple;
    "
    :disabled="teamsForefereeLength === 0"
  >
    <span class="p-button-label">{{
      teamsForefereeLength !== 0 ? '+ Выбрать команду' : ''
    }}</span></Button
  >
  <div class="game__card" v-else>
    <div class="table-wrap">
      <img v-if="item && item.post_thumbnail" :src="item.post_thumbnail" alt="Avatar" />
      <span v-if="item.post_title || (item && item.team)"
        >{{ item.post_title || item.team.post_title }}
      </span>
      <span class="p-badge" v-if="rating"> 3 453 </span>
    </div>
    <div class="table-wrap">
      <div class="game__list" v-if="rating">
        <div class="">Сыграно 678 матчей</div>
        <div class="success">Победы 479 (72%)</div>
        <div class="secondary">Ничья 0</div>
        <div class="danger">Поражения 112 (28%)</div>
      </div>
      <Button
        v-if="matches.length <= 0"
        @click="refereeStore.removeTeamFromCouple(+indexGroup, +indexCouple)"
        class="btn-trash"
        ><svg-icon name="trash.svg"
      /></Button>
    </div>
  </div>

  <!-- {{ indexGroup }} {{ indexCouple }} -->
  <!-- currentID = id; -->
</template>

<script setup>
  import { useTournamentStore } from '@/store/TournamentStore';
  const tournamentStore = useTournamentStore();
  const { showRegModal } = storeToRefs(tournamentStore);

  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore.js';
  const tournamentPageStore = useTournamentPageStore();
  const { ifReferee, matches } = storeToRefs(tournamentPageStore);

  import { useRefereeStore } from '@/modules/tournaments/store/RefereeStore';
  const refereeStore = useRefereeStore();
  const { teamsForefereeLength } = storeToRefs(refereeStore);

  const props = defineProps({
    // id: {
    //   type: Number,
    //   required: true,
    // },
    item: {
      type: Object,
      required: false,
    },
    indexGroup: {
      type: Number,
      required: true,
    },
    indexCouple: {
      type: Number,
      required: true,
    },
  });
</script>

<style scoped>
  /* Your component's CSS code goes here */
</style>
