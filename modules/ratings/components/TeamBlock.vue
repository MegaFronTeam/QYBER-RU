<template>
  <section class="sMyProfileBlock">
    <div class="container">
      <div class="template">
        <div class="sMyProfileBlock__head-row row">
          <div class="col">
            <h3 v-if="raitingTeamStore.userTeamData && raitingTeamStore.userTeamData.length">
              Мои команды
            </h3>
            <h3 class="mb-0" v-else>У этого пользователя еще нет команд</h3>
          </div>
        </div>
        <TeamData />
      </div>
      <div
        v-if="raitingTeamStore.userTeamData && raitingTeamStore.userTeamData.length"
        class="template template--footer"
      >
        <Paginator @page="onPaginate" rows="10" :totalRecords="raitingTeamStore.totalRecords" />
      </div>
    </div>
  </section>
</template>

<script setup>
import Paginator from 'primevue/paginator';
import TeamData from './TeamData.vue';
import { useRaitingTeamStore } from '../modules/ratings/store/RaitingTeamStore';

const raitingTeamStore = useRaitingTeamStore();

const route = useRoute();

const onPaginate = async (e) =>
  await raitingTeamStore.fetchUserTeams(
    `/wp/v2/teams?member=${route.params.id}&page=${e.page + 1}`,
  );
</script>

<style lang="scss" scoped>
.sMyProfileBlock {
  margin-bottom: 12px;
}
</style>
