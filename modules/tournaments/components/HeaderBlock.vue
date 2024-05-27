<template>
  <HeaderBlock
    :title="data.title"
    :bg="data.post_thumbnail"
    class="sHeaderBlock sHeaderBlock--detailed"
  >
    <div class="header-item">
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
      <ShareTournamentRegistration />
    </div>
    <div class="header-item">
      <div class="steps-wrap">
        <div class="step step_active">
          <p><span>Анонсирован</span></p>
          <!-- TODO: need data -->
          <p>28 января 2024 г. в 14:00</p>
        </div>
        <div class="step">
          <p><span>Регистрация</span></p>
          <!-- TODO: need data -->
          <p>28 января 2024 г. в 14:00 - 28 февраля 2024 в 14:00</p>
        </div>
        <div class="step">
          <p><span>Проведение турнира</span></p>
          <p v-html="data.date"></p>
        </div>
      </div>
    </div>
  </HeaderBlock>
  <div class="container sTournamentOverview">
    <div class="sTournamentOverview__head">
      <div class="head-item">
        <p><span>Дисциплина</span></p>
        <p v-for="item in data.discipline" :key="item.slug" v-html="item.name"></p>
      </div>
      <div class="head-item">
        <p><span>Лига</span></p>
        <p v-for="item in data.leagues" :key="item.slug" v-html="item.name"></p>
      </div>
      <div class="head-item">
        <p><span>Формат</span></p>
        <!-- TODO: need data -->
        <p>5x5</p>
      </div>
      <div class="head-item">
        <p><span>Команды</span></p>
        <!-- TODO: need data -->
        <p>{{ data.teamLength }}/8</p>
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
  const tournamentStorePage = useTournamentPageStore();

  const { data } = storeToRefs(tournamentStorePage);
</script>
