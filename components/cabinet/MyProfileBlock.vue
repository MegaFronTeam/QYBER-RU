<template>
  <section class="sMyProfileBlock">
    <div class="container">
      <div class="template template--header">
        <div class="btn-wrap template-wrap">
          <Button @click="active = 0" :class="active === 0 ? 'active' : ''"> Мой профиль </Button>
          <!-- v-if="teamsStore.myTeamsCount > 0" -->
          <Button @click="active = 1" :class="active === 1 ? 'active' : ''">
            Мои команды
            <Badge :value="myTeams.length"></Badge>
          </Button>
        </div>
      </div>
      <div class="template">
        <TabView v-model:activeIndex="active">
          <TabPanel>
            <h3>Мой профиль</h3>
            <CabinetUserData />
          </TabPanel>
          <TabPanel>
            <div class="sMyProfileBlock__head-row row">
              <div class="col">
                <h3>Мои команды</h3>
              </div>
              <div class="col-auto">
                <CabinetTeamCreate />
              </div>
            </div>
            <CabinetUserTeamsData />
          </TabPanel>
        </TabView>
      </div>
      <!-- <div v-if="active === 1 && teamsArr.length > 0" class="template template--footer">
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
  // import CreateTeam from '@/components/cabinet/CreateTeam.vue';
  import { useTeamStore } from '@/store/TeamStore';
  const teamsStore = useTeamStore();
  const { myTeams } = storeToRefs(teamsStore);

  const active = ref(0);
</script>

<style scoped lang="scss">
  .sMyProfileBlock {
    padding-bottom: 6px;
    @media screen and (min-width: 992px) {
      padding-bottom: 12px;
    }
  }
</style>
