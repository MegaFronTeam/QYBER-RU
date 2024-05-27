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
    <!-- <div class="sTournamentOverview__item">
            <h5>Расписание</h5>
            <div class="sTournamentOverview__descr overview-item">
              <p>28 февраля в 14:00 мск — окончание приема заявок;</p>
              <p>28 января c 13:30 до 14:00 мск — подтверждение участия в турнире;</p>
              <p>28 января в 14:05 мск — публикация турнирной сетки;</p>
              <p>28 января в 14:10 мск — начало 1-го тура.</p>
            </div>
            <div class="sTournamentOverview__descr overview-item">
              <p><a href="#"> Инструкция по регистрации на платформе турнира </a></p>
            </div>
          </div>
          <div class="sTournamentOverview__item">
            <h5>Призовой фонд</h5>
            <div class="sTournamentOverview__descr overview-item">
              <h6>Призы получают команды, занявшие места с 1 по 8 *</h6>
              <p>
                1 место — 10 000 рублей на команду;<br />
                2 место — 7000 рублей на команду;<br />
                3-4 место — 5000 рублей на команду;<br />
                5-8 место — 3250 рублей на команду.
              </p>
              <p>
                <span
                  >*Передача призов будет осуществлена в течение 30 (тридцати) рабочих дней с
                  момента предоставления необходимых реквизитов.</span
                >
              </p>
            </div>
          </div> -->
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
