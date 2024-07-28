<template>
  <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
    <Button label="Регистрация на турнир" class="w-full" />
  </NuxtLink>
  <template v-else>
    <Button
      v-if="!matchesGrid || !matchesGrid.length"
      @click="
        showRegModal = true;
        currentID = id;
      "
      label="Регистрация на турнир"
      class="w-full"
    />
  </template>
</template>
<script setup>
  import { useGlobalStore } from '@/store/globalStore';
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  import { useTournamentStore } from '@/store/TournamentStore';

  const globalStore = useGlobalStore();
  const tournamentStore = useTournamentStore();
  const { showRegModal, currentID } = storeToRefs(tournamentStore);
  const tournamentStorePage = useTournamentPageStore();
  const { matchesGrid } = storeToRefs(tournamentStorePage);
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
  });
</script>
