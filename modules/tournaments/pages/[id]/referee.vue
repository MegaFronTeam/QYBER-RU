<template>
  <Referee />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  import Referee from '@/modules/tournaments/components/Referee/Referee.vue';

  import { useRoute } from 'vue-router';
  const { id } = useRoute().params;

  import { useTournamentPageStore } from '~/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);

  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

  const breadcrumbsStore = useBreadcrumbsStore();

  onMounted(() => {
    if (id !== currentID.value) {
      tournamentStorePage.fetchData(id).then(() => {
        // console.log(tournamentStorePage.data.title);
        breadcrumbsStore.setNameFromIds(tournamentStorePage.data.title);
      });
    }
  });
</script>
