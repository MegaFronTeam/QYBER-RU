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
  import { useTournamentPageStore } from '~/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);

  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

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
    title: 'Контакты - ' + tournamentStorePage.data.title,
    // meta: [{ name: 'description', content: 'My amazing site.' }],
  });
</script>
