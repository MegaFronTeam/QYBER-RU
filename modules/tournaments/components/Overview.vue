<template>
  <div class="wrap-body">
    <div class="sTournamentOverview__info">
      <svg-icon name="info.svg" />
      Для участия подтвердите свою заявку в период 28 января 2024 г. в 14:00 - 28 февраля 2024 в
      14:00
    </div>
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
  import { useGlobalStore } from '~/store/globalStore';
  import MenuBlock from './MenuBlock.vue';
  const globalStore = useGlobalStore();

  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { data } = storeToRefs(tournamentStorePage);

  const title = ref('');

  onMounted(() => {
    // tournamentStorePage.getTournament(currentID.value);
    // title.value = data.title;
  });
</script>
