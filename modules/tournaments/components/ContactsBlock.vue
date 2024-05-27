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
        <a href="https://discord.gg/ZzFGB6yN7s" target="_blank" rel="noopener noreferrer"
          >https://discord.gg/ZzFGB6yN7s</a
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
      <div class="sContactBlock__profile-info">
        <span>Почта для связи с организаторами</span>
        <a
          :href="'mailto:' + globalStore.contacts.email"
          target="_blank"
          rel="noopener noreferrer"
          >{{ globalStore.contacts.email }}</a
        >
      </div>
    </div>
    <div class="wrap-footer d-lg-none">
      <div class="template template--footer">
        <Paginator
          :rows="rowsPerPage[0]"
          :totalRecords="totalRecords"
          :rowsPerPageOptions="rowsPerPage"
          :pageLinkSize="4"
        >
          <template #start="slotProps">
            Показано от {{ slotProps.state.page * slotProps.state.rows + 1 }} до
            {{
              slotProps.state.first + slotProps.state.rows > totalRecords
                ? totalRecords
                : slotProps.state.first + slotProps.state.rows
            }}
            из {{ totalRecords }} данных
          </template>
        </Paginator>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useGlobalStore } from '~/store/globalStore';
  import MenuBlock from './MenuBlock.vue';
  const globalStore = useGlobalStore();

  const totalRecords = ref(10);
  const rowsPerPage = ref([5, 10, 50, 100]);
</script>
