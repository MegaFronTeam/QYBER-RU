<template>
  <section class="sMyTeamBlock">
    <div class="container">
      <div class="template template--header">
        <div class="btn-wrap template-wrap">
          <Button @click="active = 0" :class="active === 0 ? 'active' : ''">
            Состав команды
          </Button>
          <Button @click="active = 1" :class="active === 1 ? 'active' : ''">
            Участие в турнирах
          </Button>
        </div>
      </div>
      <div class="template">
        <TabView v-model:activeIndex="active">
          <TabPanel v-if="teamStore.teamData.members.length > 0">
            <div class="sMyTeamBlock__head-row row">
              <div class="col">
                <h3>Состав команды</h3>
              </div>
              <div class="col-auto">
                <InviteMember />
              </div>
            </div>
            <DataTable :value="teamStore.teamData.members">
              <Column
                style="width: 30%"
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="nickname"
                header="Никнейм"
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
                    <img
                      v-if="slotProps.data.avatar"
                      :src="`${slotProps.data.avatar.url}`"
                      alt="Avatar"
                    />
                    <span>{{ slotProps.data.user_nicename }}</span>
                  </div>
                </template>
              </Column>
              <Column
                style="width: 30%"
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="name"
                header="Имя"
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
                  <span class="small-text">
                    {{ slotProps.data.user_login }}
                  </span>
                </template>
              </Column>
              <Column
                style="width: 40%"
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="role"
                header="Роль"
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
                  <div class="d-flex align-items-center">
                    <span class="small-text">
                      {{ slotProps.data.role }}
                    </span>
                    <Button
                      v-if="slotProps.data.role !== 'Капитан'"
                      severity="danger"
                      outlined
                      class="btn-sm ms-auto"
                      @click="deletePlayer(slotProps.data.id)"
                      >Удалить</Button
                    >
                  </div>
                </template>
              </Column>
            </DataTable>
            <!--<h4>Добавить игроков в команду</h4>
            <DataTable :value="addNew">
              <Column
                style="width: 30%"
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="nickname"
                header="Никнейм"
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
                    <img :src="`/img/${slotProps.data.nickname.avatar}`" alt="Avatar" />
                    <span>{{ slotProps.data.nickname.text }}</span>
                  </div>
                </template>
              </Column>
              <Column
                :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                field="name"
                header="Имя"
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
                  <div class="d-flex align-items-center">
                    <span class="small-text">
                      {{ slotProps.data.name }}
                    </span>
                    <Button label="Пригласить в команду" class="ms-auto btn-sm" />
                  </div>
                </template>
              </Column>
            </DataTable> -->
          </TabPanel>
          <TabPanel>
            <CabinetTeamTournaments :teamData="tournamentsMy" />
          </TabPanel>
        </TabView>
      </div>
      <!-- <div class="template template--footer">
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
      </div> -->
    </div>
  </section>
</template>

<script setup>
  import InviteMember from '@/components/cabinet/InviteMember.vue';
  import { useTeamStore } from '~/store/TeamStore';

  // const props = defineProps({
  //   pageID: {
  //     type: String,
  //     required: false,
  //   },
  // });

  // const { pageID } = props;
  const active = ref(1);
  const teamStore = useTeamStore();
  const teamMembers = ref(teamStore.teamData.members);

  // console.log('Members 1', teamMembers.value);
  // console.log('Members 2', teamStore.teamData.members);

  //  sconst teamDataRef = ref(teamData);
  const deletePlayer = (USER_ID) => {
    teamStore.deleteTeamMember(USER_ID);
    // teamDataRef.value.members = teamDataRef.value.members.filter((element) => element.id != USER_ID);
    // Team.deleteTeamMember(pageID, USER_ID)
    //   .then((response) => {
    //     if (!response) return;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
</script>

<style scoped lang="scss">
  .sMyTeamBlock {
    padding-bottom: 6px;
    @media screen and (min-width: 992px) {
      padding-bottom: 12px;
    }
  }
</style>
