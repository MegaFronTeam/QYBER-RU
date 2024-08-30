<template>
  <Schedule />
</template>

<script setup>
  definePageMeta({
    layout: 'tournament',
  });
  import Schedule from '@/modules/tournaments/components/Schedule.vue';

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

  useSeoMeta({
    title: 'Расписание - ' + tournamentStorePage.data.title,
    // meta: [{ name: 'description', content: 'My amazing site.' }],
  });
</script>
