<template>
  <Overview />
</template>

<script setup>
  import Overview from '@/modules/tournaments/components/Overview.vue';
  import { useRoute } from 'vue-router';
  import { useTournamentPageStore } from '~/modules/tournaments/store/TournamentPageStore';
  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

  definePageMeta({
    layout: 'tournament',
  });

  const { id } = useRoute().params;
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);
  const breadcrumbsStore = useBreadcrumbsStore();

  if (id !== currentID.value) {
    tournamentStorePage.fetchData(id).then(() => {
      breadcrumbsStore.setNameFromIds(tournamentStorePage.data.title);
    });
  }
  onMounted(() => {
    breadcrumbsStore.setNameFromIds(tournamentStorePage.data.title);
  });

  useSeoMeta({
    title: tournamentStorePage.data.title,
    // meta: [{ name: 'description', content: 'My amazing site.' }],
  });
</script>
