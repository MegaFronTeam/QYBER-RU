<template>
  <HeaderBlock
    :title="data.title"
    :bg="data.post_thumbnail"
    class="sHeaderBlock sHeaderBlock--detailed"
  >
    <!-- TODO: add timer -->

    <div class="header-item" v-if="timer">
      <div class="data-start"><span>До начала турнира:</span></div>
      <div class="timer">
        <div class="timer__item">
          <span>00</span>
          <p>Дней</p>
        </div>
        <div class="timer__item">
          <span>00</span>
          <p>Часов</p>
        </div>
        <div class="timer__item">
          <span>00</span>
          <p>Минут</p>
        </div>
      </div>
    </div>
    <div class="header-item">
      <ShareTournamentRegistration :id="data.id" />
    </div>
    <div class="header-item">
      <div class="steps-wrap">
        <div class="step">
          <p><span>Анонсирован</span></p>
          <p>{{ formatDate(data.announcement) }}</p>
        </div>
        <div class="step">
          <p><span>Регистрация</span></p>
          <p v-if="data.accepting_applications">
            {{ data.accepting_applications.startFormat }} -
            {{ data.accepting_applications.endFormat }}
          </p>
        </div>
        <div class="step">
          <p><span>Проведение турнира</span></p>
          <p v-html="data.date2"></p>
        </div>
      </div>
    </div>
  </HeaderBlock>
  <div class="container sTournamentOverview">
    <div class="sTournamentOverview__head">
      <div class="head-item">
        <p><span>Дисциплина</span></p>
        <p v-for="item in data.discipline" :key="item.slug">{{ item.name }}</p>
      </div>
      <div class="head-item">
        <p><span>Лига</span></p>
        <p v-for="item in data.leagues" :key="item.slug" v-html="item.name"></p>
      </div>
      <div class="head-item">
        <p><span>Формат</span></p>
        <p>{{ data.format }}</p>
      </div>
      <div class="head-item">
        <p><span>Команды</span></p>
        <p>{{ data.teamLength }}</p>
      </div>
      <div class="head-item">
        <p><span>Призовой фонд</span></p>
        <p v-html="data.prize_fund"></p>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
  import { useGlobalStore } from '~/store/globalStore';

  const tournamentStorePage = useTournamentPageStore();
  const globalStore = useGlobalStore();

  const { data } = storeToRefs(tournamentStorePage);
</script>
