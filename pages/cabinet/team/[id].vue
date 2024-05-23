<template>
  <div>
    <ProfileHead :img="imgRef" :breadcrumbArr="breadcrumbArr">
      <h1 class="mb-12">{{ teamsData.post_title }}</h1>
      <div v-if="teamsData.leagues && teamsData.discipline" class="row mb-12">
        <div v-if="teamsData.leagues" class="col-auto">
          <Badge
            v-for="league in teamsData.leagues"
            :key="league.term_id"
            :severity="league.name == 'Кибер атланты' ? 'secondary' : 'danger'"
            :value="league.name"
            class="p-badge-outline"
          />
        </div>
        <div v-if="teamsData.discipline" class="col-auto">
          <span
            v-for="discipline in teamsData.discipline"
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
      <TeamBlock v-if="!teamsStore.isCaptain" :teamData="teamsData" />
      <MyTeamBlock v-else />
    </div>
  </div>
</template>

<script setup>
  import ProfileHead from '@/components/cabinet/ProfileHead.vue';
  import TeamBlock from '@/components/cabinet/TeamBlock.vue';
  import MyTeamBlock from '@/components/cabinet/MyTeamBlock.vue';
  import { useTeamStore } from '@/store/TeamStore';
  const teamsStore = useTeamStore();
  const { id } = useRoute().params;

  import { useGlobalStore } from '@/store/globalStore';
  const globalStore = useGlobalStore();

  const breadcrumbArr = ref([
    { label: 'Личный кабинет', route: '/' },

    { label: 'Мои команды', route: '/' },
  ]);

  const imgRef = ref(null);
  const teamsData = ref({});

  // console.log(typeof id);
  onMounted(async () => {
    teamsStore.currentTeamID = id;
    console.log(teamsStore.currentTeamID);
    await teamsStore.fetchTeam(id);
    imgRef.value = teamsStore.teamData.post_thumbnail;
    // const pending = ref(true);
    teamsData.value = teamsStore.teamData;

    console.log(teamsStore.teamData.value);
    breadcrumbArr.value.push({ label: teamsStore.teamData.post_title });
  });
</script>
