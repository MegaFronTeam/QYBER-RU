<template>
  <div class="game">
    <div class="game__title h6">
      Игра {{ index }}
      <Button class="btn-trash"><svg-icon name="trash.svg" /></Button>
    </div>
    <GameItem :item="item[0]" :indexGroup="index - 1" indexCouple="0" />
    <!-- v-if="comand_listLength % 2 === 0" -->
    <GameItem :item="item[1]" :indexGroup="index - 1" indexCouple="1" />
  </div>
</template>

<script setup>
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const { data } = storeToRefs(tournamentPageStore);

  import { useRefereeStore } from '@/modules/tournaments/store/RefereeStore';
  const refereeStore = useRefereeStore();
  const { comand_listLength } = storeToRefs(refereeStore);

  import GameItem from './GameItem.vue';
  const props = defineProps({
    item: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
</script>
