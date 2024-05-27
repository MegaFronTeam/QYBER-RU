<template>
  <div class="wrap-body">
    <div class="sTournamentOverview__title-item">
      <h3>
        Подробное описание турнира Кибер

        {{ data.title }}
      </h3>
      <div v-html="data.full_description"></div>
    </div>
    <ShareTournamentRegistration />
  </div>
  <div class="wrap-footer" v-if="shareComp">
    <div class="wrap-footer__title">Поделиться</div>
    <div class="wrap-footer__icons">
      <a href="#" class="contacts__link">
        <svg-icon name="copy.svg" />
      </a>
      <a href="#" target="_blank" class="contacts__link">
        <svg-icon name="telegram.svg" />
      </a>
      <a href="#" target="_blank" class="contacts__link">
        <svg-icon name="vk.svg" />
      </a>
    </div>
  </div>
</template>

<script setup>
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { data } = storeToRefs(tournamentStorePage);
</script>
