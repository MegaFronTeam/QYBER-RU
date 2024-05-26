<template>
  <HeaderBlock
    title="Кибер Атланты Осень 2022"
    bg="/img/headerBlock-bg-7.jpg"
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
      <NuxtLink to="/auth/login" v-if="!globalStore.isUserAuth">
        <Button label="Регистрация на турнир" class="w-full" />
      </NuxtLink>
    </div>
    <div class="header-item">
      <div class="steps-wrap">
        <div class="step step_active">
          <p><span>Анонсирован</span></p>
          <p>28 января 2024 г. в 14:00</p>
        </div>
        <div class="step">
          <p><span>Регистрация</span></p>
          <p>28 января 2024 г. в 14:00 - 28 февраля 2024 в 14:00</p>
        </div>
        <div class="step">
          <p><span>Проведение турнира</span></p>
          <p>10 марта 2024 г. в 17:00</p>
        </div>
      </div>
    </div>
  </HeaderBlock>
</template>
<script setup>
  import { useGlobalStore } from '@/store/globalStore';
  const globalStore = useGlobalStore();
</script>
