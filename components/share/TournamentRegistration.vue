<template>
  <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
    <Button label="Регистрация на турнир" class="w-full" />
  </NuxtLink>
  <Button v-else @click="showRegModal = true" label="Регистрация  на турнир" class="w-full" />
  <!-- currentID = id; -->
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

  import { useTournamentStore } from '@/store/tournamentStore';
  const tournamentStore = useTournamentStore();
  const { showRegModal, currentID } = tournamentStore;
</script>
