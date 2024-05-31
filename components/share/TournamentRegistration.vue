<template>
  <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
    <Button label="Регистрация на турнир" class="w-full" />
  </NuxtLink>
  <Button
    v-else
    @click="
      showRegModal = true;
      currentID = id;
    "
    label="Регистрация  на турнир"
    class="w-full"
  />
</template>
<script setup>
import { useGlobalStore } from '@/store/globalStore';
const globalStore = useGlobalStore();

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

import { useTournamentStore } from '@/store/TournamentStore';
const tournamentStore = useTournamentStore();
const { showRegModal, currentID } = storeToRefs(tournamentStore);
</script>
