<template>
  <div>
    <ProfileHead img="/img/team-img-1.png" :breadcrumbArr="breadcrumbArr">
      <h1 class="mb-12">{{ teamsData.post_title }}</h1>
      <div class="row mb-12">
        <div class="col-auto">
          <Badge severity="secondary" value="Кибер Атланты" class="p-badge-outline" />
        </div>
        <div class="col-auto">
          <span class="p-badge p-badge-gray">
            <svg-icon name="dota.svg" />
            Dota 2
          </span>
        </div>
      </div>
      <span class="sProfileHead__name mb-12">Самара</span>
      <div class="sProfileHead__time mb-0">ИНН 772331755151</div>
    </ProfileHead>
    <div v-if="pending" class="container table-skeleton" style="margin-bottom: 0.8rem">
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
      <TeamBlock v-if="!isCaptain" :teamData="teamsData" />
      <MyTeamBlock v-if="isCaptain" :teamData="teamsData" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import team from '~/services/team';
const { $locally } = useNuxtApp();

const { id } = useRoute().params;

const breadcrumbArr = ref([
  { label: 'Личный кабинет', route: '/' },
  { label: 'Мои команды', route: '/' },
]);
const isCaptain = ref(false);
const pending = ref(true);
const teamsData = ref({});
onMounted(() => {
  team
    .getTeam(id)
    .then((response) => {
      pending.value = false;
      response.members.forEach((member) => {
        if (+member.id === +$locally.getItem('ID') && member.role === 'Капитан')
          isCaptain.value = true;
        teamsData.value = response;
      });
      breadcrumbArr.value.push({ label: response.post_title });
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
