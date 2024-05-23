<template>
  <section class="sTournamentOverview sTournamentOverview--participants">
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
            <a class="active" href="#">Обзор</a>
            <a href="#">Расписание</a>
            <a href="#">Сетка</a>
            <a href="#">Участники</a>
            <a href="#">Правила</a>
            <a href="#">Контакты</a>
            <a href="#">Жеребьевка <span>Для судей</span></a>
          </div>
        </div>

        <div class="wrap-body">
          <div class="template">
            <TabView v-model:activeIndex="active">
              <TabPanel>
                <DataTable :value="products">
                  <Column
                      :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                      field="team"
                      header="Команда"
                      sortable
                    >
                      <template #sorticon="slotProps">
                        <svg
                          :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                            fill="#9E9FA3"
                          />
                        </svg>
                      </template>
                      <template #body="slotProps">
                        <div class="table-wrap">
                          <NuxtImg :src="`/img/${slotProps.data.team.avatar}`" alt="Avatar" />
                          <span>{{ slotProps.data.team.text }}</span>
                        </div>
                      </template>
                  </Column>
                  <Column
                    :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                    field="organisation"
                    header="Организация"
                    sortable
                  >
                    <template #sorticon="slotProps">
                      <svg
                        :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                          fill="#9E9FA3"
                        />
                      </svg>
                    </template>
                    <template #body="slotProps">
                      <span class="rating">
                        {{ slotProps.data.organisation.label }}
                      </span>
                    </template>
                  </Column>
                  <Column
                    :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                    field="registration"
                    header="Дата регистрации"
                    sortable
                  >
                    <template #sorticon="slotProps">
                      <svg
                        :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                          fill="#9E9FA3"
                        />
                      </svg>
                    </template>
                    <template #body="slotProps">
                      <span class="rating">{{ slotProps.data.registration }} </span>
                    </template>
                  </Column>
                  <Column>
                      <template #body="slotProps">
                        <span class="p-badge">
                          Зарегистрирована
                        </span>
                    </template>
                  </Column>
                </DataTable>
              </TabPanel>
              <TabPanel>
                <DataTable :value="products">
                  <Column
                    :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                    field="team"
                    header="Команда"
                    sortable
                  >
                    <template #sorticon="slotProps">
                      <svg
                        :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                          fill="#9E9FA3"
                        />
                      </svg>
                    </template>
                    <template #body="slotProps">
                      <div class="table-wrap">
                        <NuxtImg :src="`/img/${slotProps.data.team.avatar}`" alt="Avatar" />
                        <span>{{ slotProps.data.team.text }}</span>
                      </div>
                    </template>
                  </Column>
                  <Column
                    :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                    field="organisation"
                    header="Организация"
                    sortable
                  >
                    <template #sorticon="slotProps">
                      <svg
                        :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                          fill="#9E9FA3"
                        />
                      </svg>
                    </template>
                    <template #body="slotProps">
                      <span class="rating">
                        {{ slotProps.data.organisation.label }}
                      </span>
                    </template>
                  </Column>
                  <Column
                    :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                    field="registration"
                    header="Дата регистрации"
                    sortable
                  >
                    <template #sorticon="slotProps">
                      <svg
                        :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                          fill="#9E9FA3"
                        />
                      </svg>
                    </template>
                    <template #body="slotProps">
                      <span class="rating">{{ slotProps.data.registration }} </span>
                    </template>
                  </Column>
                  <Column>
                    <template #body="slotProps">
                      <span class="p-badge">
                        Зарегистрирована
                      </span>
                  </template>
                  </Column>
                </DataTable>
              </TabPanel>
              <TabPanel>
                <DataTable :value="products">
                  <Column
                    :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                    field="team"
                    header="Команда"
                    sortable
                  >
                    <template #sorticon="slotProps">
                      <svg
                        :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                          fill="#9E9FA3"
                        />
                      </svg>
                    </template>
                    <template #body="slotProps">
                      <div class="table-wrap">
                        <NuxtImg :src="`/img/${slotProps.data.team.avatar}`" alt="Avatar" />
                        <span>{{ slotProps.data.team.text }}</span>
                      </div>
                    </template>
                  </Column>
                  <Column
                    :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                    field="organisation"
                    header="Организация"
                    sortable
                  >
                    <template #sorticon="slotProps">
                      <svg
                        :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                          fill="#9E9FA3"
                        />
                      </svg>
                    </template>
                    <template #body="slotProps">
                      <span class="rating">
                        {{ slotProps.data.organisation.label }}
                      </span>
                    </template>
                  </Column>
                  <Column
                    :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                    field="registration"
                    header="Дата регистрации"
                    sortable
                  >
                    <template #sorticon="slotProps">
                      <svg
                        :class="slotProps.sortOrder == 1 ? `sorted` : ``"
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.20493 4.5H8.79494C8.89382 4.50041 8.99036 4.53014 9.07236 4.58542C9.15435 4.6407 9.21811 4.71906 9.25557 4.81057C9.29303 4.90209 9.30252 5.00266 9.28282 5.09957C9.26313 5.19647 9.21515 5.28536 9.14494 5.355L6.35494 8.145C6.30845 8.19186 6.25315 8.22906 6.19222 8.25445C6.13129 8.27983 6.06594 8.2929 5.99994 8.2929C5.93393 8.2929 5.86858 8.27983 5.80765 8.25445C5.74672 8.22906 5.69142 8.19186 5.64494 8.145L2.85494 5.355C2.78472 5.28536 2.73674 5.19647 2.71705 5.09957C2.69735 5.00266 2.70684 4.90209 2.7443 4.81057C2.78176 4.71906 2.84552 4.6407 2.92751 4.58542C3.00951 4.53014 3.10605 4.50041 3.20493 4.5Z"
                          fill="#9E9FA3"
                        />
                      </svg>
                    </template>
                    <template #body="slotProps">
                      <span class="rating">{{ slotProps.data.registration }} </span>
                    </template>
                  </Column>
                  <Column>
                    <template #body="slotProps">
                      <span class="p-badge p-badge-gray">
                        Выбыла в раунде 1/32
                      </span>
                  </template>
                  </Column>
                </DataTable>
              </TabPanel>
            </TabView>
          </div>
        </div>
        <div class="wrap-footer">
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
