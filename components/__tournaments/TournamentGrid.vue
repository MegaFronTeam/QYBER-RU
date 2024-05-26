<template>
  <section class="sTournamentOverview sTournamentOverview--grid">
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
            <a class="active" href="#">Сетка</a>
            <a href="#">Участники</a>
            <a href="#">Правила</a>
            <a href="#">Контакты</a>
            <a href="#">Жеребьевка <span>Для судей</span></a>
          </div>
        </div>

        <div class="wrap-body">
          <div class="tournament-table">
            <div class="tournament-table__item">
              <div class="tournament-table__item-title">Победители</div>
              <div class="tournament-table__winner-row row">
                <div class="col-auto">
                  <div class="sGridCardItem sGridCardItem--winner">
                    <div class="teams-group">
                      <div class="sGridCard sGridCard__team team-winner">
                        <div class="sGridCard__score">1</div>
                        <div class="sGridCard__wrap">
                          <NuxtImg :src="`/img/teamGrid-1.png`" alt="Avatar" class="img" />
                          <span>Команда 1</span>
                        </div>
                      </div>
                      <div class="sGridCard__price">Приз: 200 000 ₽</div>
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="sGridCardItem sGridCardItem--winner">
                    <div class="teams-group">
                      <div class="sGridCard sGridCard__team">
                        <div class="sGridCard__score">2</div>
                        <div class="sGridCard__wrap">
                          <NuxtImg :src="`/img/teamGrid-1.png`" alt="Avatar" class="img" />
                          <span>Команда 1</span>
                        </div>
                      </div>
                      <div class="sGridCard__price">Приз: 100 000 ₽</div>
                    </div>
                  </div>
                </div>
                <div class="col-auto">
                  <div class="sGridCardItem sGridCardItem--winner">
                    <div class="teams-group">
                      <div class="sGridCard sGridCard__team">
                        <div class="sGridCard__score">3</div>
                        <div class="sGridCard__wrap">
                          <NuxtImg :src="`/img/teamGrid-1.png`" alt="Avatar" class="img" />
                          <span>Команда 1</span>
                        </div>
                      </div>
                      <div class="sGridCard__price">Приз: 50 000 ₽</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tournament-table__item">
              <div class="tournament-table__item-title">Верхняя сетка</div>
              <div class="tournament-table__title-row row">
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 1 (Online)</p>
                </div>
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 2 (Online)</p>
                </div>
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 3 (LAN)</p>
                </div>
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 4 (LAN)</p>
                </div>
                <div class="tournament-table__title-col col-auto">
                  <p>Финал (LAN)</p>
                </div>
              </div>
              <div class="tournament-table__row row">
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <TournamentsGridCard />
                  </div>
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <TournamentsGridCard />
                  </div>
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <TournamentsGridCard />
                  </div>
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <TournamentsGridCard />
                  </div>
                </div>
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <TournamentsGridCard />
                  </div>
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <TournamentsGridCard />
                  </div>
                </div>
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <div class="sGridCardItem">
                      <div class="sGridCardItem__order">24 <svg-icon name="settings.svg" /></div>
                      <div class="teams-group">
                        <div class="sGridCard sGridCard__team">
                          <div class="sGridCard__wrap">
                            <NuxtImg :src="`/img/teamGrid-1.png`" alt="Avatar" class="img" />
                            <span>Команда 1</span>
                          </div>
                          <div class="sGridCard__score">0</div>
                        </div>
                        <div class="sGridCard sGridCard__team">
                          <div class="sGridCard__wrap">
                            <NuxtImg :src="`/img/teamGrid-2.png`" alt="Avatar" class="img" />
                            <span>Команда 14</span>
                          </div>
                          <div class="sGridCard__score">0</div>
                        </div>
                        <Button>Присоединиться</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group tournament-table__group--small">
                    <TournamentsGridCard />
                  </div>
                </div>
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group">
                    <div class="sGridCardItem">
                      <div class="sGridCardItem__order">
                        39
                        <svg-icon name="settings.svg" />
                      </div>
                      <div class="teams-group">
                        <div class="sGridCard sGridCard__team">
                          <div class="sGridCard__wrap">
                            <NuxtImg :src="`/img/teamGrid-1.png`" alt="Avatar" class="img" />
                            <span>Команда 1</span>
                          </div>
                          <div class="sGridCard__score">0</div>
                        </div>
                        <div class="sGridCard sGridCard__team">
                          <div class="sGridCard__wrap">
                            <NuxtImg :src="`/img/teamGrid-2.png`" alt="Avatar" class="img" />
                            <span>Команда 14</span>
                          </div>
                          <div class="sGridCard__score">0</div>
                        </div>
                        <Button>Присоединиться</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="tournament-table__item">
              <div class="tournament-table__item-title">Нижняя сетка</div>
              <div class="tournament-table__title-row row">
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 1 (Online)</p>
                </div>
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 2 (Online)</p>
                </div>
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 3 (LAN)</p>
                </div>
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 4 (LAN)</p>
                </div>
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 5 (LAN)</p>
                </div>
                <div class="tournament-table__title-col col-auto">
                  <p>Раунд 6 (LAN)</p>
                </div>
              </div>
              <div class="tournament-table__row row row-low">
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group tournament-table__group--single">
                    <TournamentsGridCard />
                  </div>
                  <div class="tournament-table__group tournament-table__group--single">
                    <TournamentsGridCard />
                  </div>
                  <div class="tournament-table__group tournament-table__group--single">
                    <TournamentsGridCard />
                  </div>
                  <div class="tournament-table__group tournament-table__group--single">
                    <TournamentsGridCard />
                  </div>
                </div>
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <TournamentsGridCard />
                  </div>
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <TournamentsGridCard />
                  </div>
                </div>
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group tournament-table__group--small">
                    <TournamentsGridCard />
                  </div>
                  <div class="tournament-table__group tournament-table__group--small">
                    <TournamentsGridCard />
                  </div>
                </div>
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                    <TournamentsGridCard />
                  </div>
                </div>
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group tournament-table__group--small">
                    <TournamentsGridCard />
                  </div>
                </div>
                <div class="tournament-table__col col-auto">
                  <div class="tournament-table__group">
                    <TournamentsGridCard />
                  </div>
                </div>
              </div>
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
  import { ref } from 'vue';

  const active = ref(1);
  const products = ref([
    {
      team: {
        avatar: 'team-img-1.png',
        text: 'Team Rogue',
      },
      organisation: {
        label: 'ООО Датекс Софт',
      },
      registration: 'вт, 30 января в 15:34',
    },
    {
      team: {
        avatar: 'team-img-2.svg',
        text: 'INTZ Genesis',
      },
      organisation: {
        label: 'ООО Датекс Софт',
      },
      registration: 'вт, 30 января в 15:34',
    },
    {
      team: {
        avatar: 'team-img-1.png',
        text: 'Team Rogue',
      },
      organisation: {
        label: 'ООО Датекс Софт',
      },
      registration: 'вт, 30 января в 15:34',
    },
  ]);

  const totalRecords = ref(10);
  const rowsPerPage = ref([5, 10, 50, 100]);
</script>
