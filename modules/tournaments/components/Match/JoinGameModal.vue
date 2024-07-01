<template>
  <template v-if="matchStore.isPlayerInMatch">
    <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
      <Button label="Подключиться к игре" class="w-full" />
    </NuxtLink>
    <Button @click="show = true" label="Подключиться к игре" class="w-full" v-else />
  </template>
  <Dialog class="join-modal" v-model:visible="show" modal header="Подключение к игре">
    <CopyButton title="Формат" :data="data.format" />
    <CopyButton title="Начало игры (мск)" :data="dataMatch.date" />
    <CopyButton title="Сервер Discord" :data="dataMatch.discord" />
    <CopyButton title="Информация для подключения" :data="dataMatch.server" />

    <Button @click="show = false" class="btn-lg">Закрыть</Button>
  </Dialog>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '~/store/globalStore';
import CopyButton from './CopyButton.vue';
const globalStore = useGlobalStore();

import { useMyMatchStore } from '~/modules/tournaments/store/MatchStore';
const matchStore = useMyMatchStore();
const { dataMatch } = storeToRefs(matchStore);

import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
const tournamentPageStore = useTournamentPageStore();
const { data } = storeToRefs(tournamentPageStore);

const show = ref(false);
</script>

<style lang="scss">
.join-modal {
  .p-button {
    margin-bottom: 1rem;
  }
}
</style>
