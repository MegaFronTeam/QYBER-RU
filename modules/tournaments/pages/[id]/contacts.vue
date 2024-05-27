<template>
  <ContactsBlock />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  import { useRoute } from 'vue-router';
  const { id } = useRoute().params;
  import ContactsBlock from '@/modules/tournaments/components/ContactsBlock.vue';
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);
  if (id !== currentID.value) {
    tournamentStorePage.fetchData(id);
  }
</script>
