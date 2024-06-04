<template>
  <div class="sTournamentOverview--contacts">
    <div class="cards-wrapper">
      <!-- TODO: need contact data -->
      <div class="sContactBlock__profile-info">
        <span>Сайт:</span>
        <a href="https://qyber.ru/" target="_blank" rel="noopener noreferrer">https://qyber.ru/</a>
      </div>
      <div class="sContactBlock__profile-info">
        <span>Discord сервер:</span>
        <a :href="globalStore.contacts.discord[0].link" target="_blank" rel="noopener noreferrer">{{
          globalStore.contacts.discord[0].link
        }}</a>
      </div>
      <div class="sContactBlock__profile-info">
        <span>Почта для связи с организаторами</span>
        <a
          :href="'mailto:' + globalStore.contacts.email"
          target="_blank"
          rel="noopener noreferrer"
          >{{ globalStore.contacts.email }}</a
        >
      </div>
      <!-- <div class="sContactBlock__profile-info">
        <span>Почта для связи с организаторами</span>
        <a
          :href="'mailto:' + globalStore.contacts.email"
          target="_blank"
          rel="noopener noreferrer"
          >{{ globalStore.contacts.email }}</a
        >
      </div>
      <div class="sContactBlock__profile-info">
        <span>Почта для связи с организаторами</span>
        <a
          :href="'mailto:' + globalStore.contacts.email"
          target="_blank"
          rel="noopener noreferrer"
          >{{ globalStore.contacts.email }}</a
        >
      </div> -->
    </div>
  </div>
</template>

<script setup>
  import { useGlobalStore } from '~/store/globalStore';
  import MenuBlock from './MenuBlock.vue';
  const globalStore = useGlobalStore();
  const { contacts } = storeToRefs(globalStore);
</script>
