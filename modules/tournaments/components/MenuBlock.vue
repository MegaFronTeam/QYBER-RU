<template>
  <div class="div">
    <div class="wrap-header">
      <NuxtLink :to="`/tournaments/${currentID}`"> Обзор</NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}-schedule`">Расписание </NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}-grid`">Сетка </NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}-participants`">Участники </NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}-rules`"> Правила</NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}-contacts`">Контакты </NuxtLink>
      <NuxtLink :to="`/tournaments/${currentID}-referee`"
        >Жеребьевка <span>Для судей</span></NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { currentID } = storeToRefs(tournamentStorePage);
</script>
