<template>
  <div>
    <ProfileHead :img="teamData.post_thumbnail">
      <h1 class="mb-12">
        {{ teamData.post_title }}
      </h1>
      <div v-if="teamData.leagues && teamData.discipline" class="row mb-12">
        <div v-if="teamData.leagues.length" class="col-auto">
          <Badge
            v-for="league in teamData.leagues"
            :key="league.term_id"
            :severity="league.name == 'Кибер атланты' ? 'secondary' : 'danger'"
            :value="league.name"
            class="p-badge-outline"
          />
        </div>
        <div v-if="teamData.discipline" class="col-auto">
          <span
            v-for="discipline in teamData.discipline"
            :key="discipline.term_id"
            class="p-badge p-badge-gray"
          >
            <!-- <svg-icon name="dota.svg" /> -->
            {{ discipline.name }}
          </span>
        </div>
      </div>
      <!-- Todo: Need info -->
      <span class="sProfileHead__name mb-12" v-if="globalStore.userData.user_city">{{
        globalStore.userData.user_city
      }}</span>
      <div class="sProfileHead__time mb-0" v-if="globalStore.userData.user_inn">
        ИНН {{ globalStore.userData.user_inn }}
      </div>
      <EditTeam />
      <CabinetTeamDelete :id="id" />
    </ProfileHead>
    <div v-if="teamsStore.loader" class="container table-skeleton" style="margin-bottom: 0.8rem">
      <Skeleton height="3rem" borderRadius="12px" style="margin-bottom: 0.8rem" />
      <div class="d-flex align-items-center" style="margin-bottom: 0.5rem">
        <Skeleton shape="circle" size="3rem" style="margin-right: 0.8rem; flex: 0 0 auto" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" />
      </div>
      <div class="d-flex align-items-center" style="margin-bottom: 0.5rem">
        <Skeleton shape="circle" size="3rem" style="margin-right: 0.8rem; flex: 0 0 auto" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" />
      </div>
      <div class="d-flex align-items-center" style="margin-bottom: 0.5rem">
        <Skeleton shape="circle" size="3rem" style="margin-right: 0.8rem; flex: 0 0 auto" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" style="margin-right: 0.8rem" />
        <Skeleton height="2rem" />
      </div>
    </div>
    <div v-else>
      <CabinetTeamBlock :teamData="teamData" />
      <!-- <CabinetTeamMyTeamBlock v-else /> -->
    </div>
  </div>
</template>

<script setup>
  import ProfileHead from '@/components/cabinet/ProfileHead.vue';
  import { useTeamStore } from '@/store/TeamStore';
  const teamsStore = useTeamStore();
  const { id } = useRoute().params;

  // import { useTournamentStore } from '@/store/TournamentStore';
  // const tournamentStore = useTournamentStore();

  const { teamData, isCaptain } = storeToRefs(teamsStore);

  import { useGlobalStore } from '@/store/globalStore';
  import EditTeam from '~/components/cabinet/Team/EditTeam.vue';
  const globalStore = useGlobalStore();

  await teamsStore.fetchTeam(id);
</script>
