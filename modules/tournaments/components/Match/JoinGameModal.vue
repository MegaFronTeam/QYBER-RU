<template>
  <!-- <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
    <Button :label="btnLabel" class="w-full" />
  </NuxtLink> -->
  <Button
    @click="show = true"
    v-on:click="fetchMatch(id)"
    :label="btnLabel"
    class="w-full sGridCardItem__info-btn"
  />

  <Dialog class="join-modal" v-model:visible="show" modal header="Подключение к игре">
    <CopyButton title="Формат" :data="data.format" />
    <CopyButton v-if="dataMatch.date" title="Начало игры" :data="dataMatch.date" />
    <CopyButton v-if="dataMatch.discord" title="Сервер Discord" :data="dataMatch.discord" />
    <CopyButton
      v-if="isPlayerInMatch"
      title="Информация для подключения"
      :data="dataMatch.server"
    />

    <Button @click="show = false" class="btn-lg">Закрыть</Button>
  </Dialog>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '~/store/globalStore';
import { useMyMatchStore } from '~/modules/tournaments/store/MatchStore';
import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
import CopyButton from './CopyButton.vue';

const props = defineProps({
  btnLabel: {
    default: 'Подключиться к игре',
  },
  id: {
    type: String,
    required: false,
  },
  isPlayerInMatch: {
    type: Boolean,
    default: false,
  },
});

const globalStore = useGlobalStore();
const matchStore = useMyMatchStore();
const tournamentPageStore = useTournamentPageStore();

const { dataMatch } = storeToRefs(matchStore);
const { data } = storeToRefs(tournamentPageStore);

const show = ref(false);

const fetchMatch = (id: string) => {
  if (id) {
    matchStore.fetchData(id);
  }
};
</script>

<style lang="scss">
.join-modal {
  .p-button {
    margin-bottom: 1rem;
  }
}
</style>
