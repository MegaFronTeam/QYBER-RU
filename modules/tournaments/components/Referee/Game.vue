<template>
  <div class="game">
    <div class="game__title h6">
      Игра {{ index }}
      <!-- TODO: add removeMethod -->
      <Button v-if="removeBtn" class="btn-trash"><svg-icon name="trash.svg" /></Button>
    </div>
    <template v-if="item['a']">
      <GameItem :item="item['a'].command" :indexGroup="index - 1" indexCouple="0" />
    </template>
    <template v-else>
      <GameItem :item="item[0]" :indexGroup="index - 1" indexCouple="0" />
    </template>
    <!-- v-if="comand_listLength % 2 === 0" -->
    <template v-if="item['b']">
      <GameItem
        v-if="item['b'].command"
        :item="item['b'].command"
        :indexGroup="index - 1"
        indexCouple="1"
      />
    </template>
    <template v-else>
      <GameItem :item="item[1]" :indexGroup="index - 1" indexCouple="1" />
    </template>
  </div>
</template>

<script setup>
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentPageStore = useTournamentPageStore();
  const { data, matches } = storeToRefs(tournamentPageStore);

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
