<template>
  <section class="sTournamentOverview sTournamentOverview--contacts">
    <div class="container">
      <div class="sTournamentOverview__head">
        <div class="head-item">
          <p><span>Дисциплина</span></p>
          <p>Dota 2</p>
        </div>
        <div class="head-item">
          <p><span>Лига</span></p>
          <p>Кибер Атланты</p>
        </div>
        <div class="head-item">
          <p><span>Формат</span></p>
          <p>5x5</p>
        </div>
        <div class="head-item">
          <p><span>Команды</span></p>
          <p>3/8</p>
        </div>
        <div class="head-item">
          <p><span>Призовой фонд</span></p>
          <p>40 000 ₽</p>
        </div>
      </div>
      <div class="sTournamentOverview__wrap">
        <div class="div">
          <div class="wrap-header">
            <a href="#">Обзор</a>
            <a href="#">Расписание</a>
            <a href="#">Сетка</a>
            <a href="#">Участники</a>
            <a href="#">Правила</a>
            <a class="active" href="#">Контакты</a>
            <a href="#">Жеребьевка <span>Для судей</span></a>
          </div>
        </div>

        <div class="wrap-body">
          <div class="cards-wrapper">
            <div class="sContactBlock__profile-info">
              <span>Сайт:</span>
              <a href="https://qyber.ru/" target="_blank" rel="noopener noreferrer"
                >https://qyber.ru/</a
              >
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
    </div>
  </section>
</template>

<script setup>
  import { useGlobalStore } from '~/store/globalStore';

  const globalStore = useGlobalStore();

  const totalRecords = ref(10);
  const rowsPerPage = ref([5, 10, 50, 100]);
</script>
