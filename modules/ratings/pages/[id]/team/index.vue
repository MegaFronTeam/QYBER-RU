<template>
  <!-- <div v-if="!raitingTeamStore.error"> -->
  <div>
    <ProfileHead :img="teamData.post_thumbnail" :showInvites="false">
      <h1 class="mb-12">{{ teamData.post_title }}</h1>
      <div class="row mb-12">
        <div v-for="league in teamData.leagues" class="col-auto">
          <Badge
            :severity="league.slug === 'atlants' ? 'secondary' : 'danger'"
            :value="league.name"
            class="p-badge-outline"
          />
        </div>
        <div v-for="discipline in teamData.discipline" class="col-auto">
          <span class="p-badge p-badge-gray"> {{ discipline.name }} </span>
        </div>
      </div>
      <span class="sProfileHead__name mb-12">{{ region }}</span>
      <div class="sProfileHead__time mb-0" v-if="captainData.inn">ИНН {{ captainData.inn }}</div>
    </ProfileHead>
    <div v-if="false" class="container table-skeleton" style="margin-bottom: 0.8rem">
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

    <CabinetTeamBlock v-else :teamData="teamData" />
  </div>
  <!-- <h1 class="container" v-else>{{ raitingTeamStore.error }}</h1> -->
</template>

<script setup>
  import ProfileHead from '~/components/cabinet/ProfileHead.vue';
  import { useRaitingTeamStore } from '~/modules/ratings/store/RaitingTeamStore';
  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';

  const route = useRoute();

  const breadcrumbsStore = useBreadcrumbsStore();
  const raitingTeamStore = useRaitingTeamStore();

  const { teamData, captainData, region } = storeToRefs(raitingTeamStore);

  await raitingTeamStore.fetchTeam(`/wp/v2/teams/${route.params.id}`);

  onMounted(() => {
    // breadcrumbsStore.setNameFromIds(raitingTeamStore.teamData.post_title);
  });
</script>
