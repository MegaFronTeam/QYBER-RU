<template>
  <section class="sTournamentOverview">
    <div class="container">
      <div class="sTournamentOverview__wrap">
        <div class="div">
          <MenuBlock />
        </div>
        <div class="wrap-body">
          <div
            class="sTournamentOverview__info"
            v-if="data.accepting_applications && isNotStart == false"
          >
            <svg-icon name="info.svg" />
            Для участия подтвердите свою заявку в период
            {{ data.accepting_applications.startFormat }} -
            {{ data.accepting_applications.endFormat }}
          </div>
          <slot></slot>
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
      </div>
      <!-- <Button label="Подробнее о турнире" class="btn-lg" /> -->
    </div>
  </section>
</template>

<script setup>
  import MenuBlock from './MenuBlock.vue';
  import { useGlobalStore } from '~/store/globalStore';
  const globalStore = useGlobalStore();

  import { useTournamentPageStore } from '~/modules/tournaments/store/TournamentPageStore';
  const tournamentStorePage = useTournamentPageStore();
  const { data, isNotStart } = storeToRefs(tournamentStorePage);

  const title = ref('');

  onMounted(() => {
    // tournamentStorePage.getTournament(currentID.value);
    // title.value = data.title;
  });
</script>
