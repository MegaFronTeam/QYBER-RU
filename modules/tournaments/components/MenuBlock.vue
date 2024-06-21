<template>
  <div class="div">
    <div class="wrap-header">
      <NuxtLink :to="`/tournaments/${currentID}`"> Обзор</NuxtLink>
      <NuxtLink v-if="formattedMatches?.length > 0" :to="`/tournaments/${currentID}/schedule`"
        >Расписание
      </NuxtLink>
      <NuxtLink v-if="formattedMatches?.length > 0" :to="`/tournaments/${currentID}/grid`"
        >Сетка
      </NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}/participants`">Участники </NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}/rules`"> Правила</NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}/contacts`">Контакты </NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}/referee`" v-if="isUserAuth && isReferee"
        >Жеребьевка <span>Для судей</span></NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useGlobalStore } from '~/store/globalStore';
  const globalStore = useGlobalStore();
  const { isUserAuth, isReferee } = storeToRefs(globalStore);
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID, formattedMatches } = storeToRefs(tournamentStorePage);
</script>
