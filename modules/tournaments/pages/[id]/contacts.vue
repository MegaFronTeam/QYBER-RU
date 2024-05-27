<template>
  <ContactsBlock />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  const router = useRouter();
  const id = router.currentRoute.value.params.id;
  import ContactsBlock from '@/modules/tournaments/components/ContactsBlock.vue';
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);
  console.log(id);
  if (id !== currentID.value) {
    tournamentStorePage.fetchData(id);
  }
</script>
