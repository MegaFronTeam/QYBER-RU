<template>
  <section class="sTeamBlock">
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
          <TabPanel v-if="teamData.members && teamData.members.length > 0">
            <div class="sMyTeamBlock__head-row row">
              <div class="col">
                <h3>Состав команды</h3>
              </div>
              <!-- <div class="col-auto" v-if="isCaptain">
                <CabinetInviteMember />
              </div> -->
            </div>
            <DataTable :value="teamData.members">
              <Column
                style="width: 33%"
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
                    <span>{{ slotProps.data.user_nickname }}</span>
                  </div>
                </template>
              </Column>
              <Column
                style="width: 33%"
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
                    {{ slotProps.data.user_last_name }}
                    {{ slotProps.data.user_first_name }}
                  </span>
                </template>
              </Column>
              <Column
                style="width: 33%"
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
                  <span class="small-text">
                    {{ slotProps.data.role.label }}
                    <Button
                      v-if="isCaptain && slotProps.data.role.value !== 'captain'"
                      severity="danger"
                      outlined
                      class="btn-sm ms-auto"
                      @click="teamStore.deleteTeamMember(slotProps.data.id)"
                      >Удалить</Button
                    >
                  </span>
                </template>
              </Column>
            </DataTable>

            <template v-if="isCaptain && potentialMembers">
              <br />
              <br />
              <br />
              <div class="sMyTeamBlock__head-row row">
                <div class="col">
                  <h5>Добавить игроков в команду</h5>
                  <br />
                </div>
              </div>
              <DataTable :value="potentialMembers">
                <Column
                  style="width: 33%"
                  :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                  field="nickname"
                  header="Никнейм"
                >
                  <template #body="slotProps">
                    <div class="table-wrap">
                      <img
                        v-if="slotProps.data.avatar"
                        :src="`${slotProps.data.avatar.url}`"
                        alt="Avatar"
                      />
                      <span>{{ slotProps.data.user_login }}</span>
                    </div>
                  </template>
                </Column>
                <Column
                  style="width: 33%"
                  :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                  field="name"
                  header="Имя"
                >
                  <template #body="slotProps">
                    <span class="small-text">
                      {{ slotProps.data.user_last_name }}
                      {{ slotProps.data.user_first_name }}
                    </span>
                  </template>
                </Column>
                <Column
                  style="width: 33%"
                  :header-props="{ 'sort-icon': 'mdi-triangle-down' }"
                  field="role"
                  header=""
                >
                  <template #body="slotProps">
                    <span class="small-text">
                      <Button
                        class="btn-sm ms-auto"
                        @click="teamStore.inviteMember(slotProps.data.user_email)"
                        >Пригласить в команду</Button
                      >
                    </span>
                  </template>
                </Column>
              </DataTable>
            </template>
          </TabPanel>
          <TabPanel>
            <CabinetTeamTournaments />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </section>

  <Dialog v-model:visible="isCreate" modal header="Приглашение отправлено">
    <div class="form-wrap">
      <p>Игрок вступит в команду после того, как примет приглашение</p>
      <Button @click="teamStore.hideModal" label="Закрыть" />
    </div>
  </Dialog>
</template>

<script setup>
  const visibleShow = ref(false);
  import { useTeamStore } from '~/store/TeamStore';
  const teamStore = useTeamStore();
  const { isCaptain, potentialMembers, isCreate } = storeToRefs(teamStore);
  // import { useTournamentStore } from '@/store/TournamentStore';
  // const tournamentStore = useTournamentStore();
  // const { tournamentsMy } = tournamentStore;

  const props = defineProps({
    teamData: {
      type: Object,
      required: false,
    },
  });
  const active = ref(0);
</script>

<style scoped lang="scss">
  .sTeamBlock {
    padding-bottom: 6px;
    @media screen and (min-width: 992px) {
      padding-bottom: 12px;
    }
  }
  .ms-auto {
    margin-left: auto;
  }
  .small-text {
    display: flex;
    align-items: center;
  }
</style>
