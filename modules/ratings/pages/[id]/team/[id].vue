<template>
  <div>
    <CabinetProfileHead :img="data.user_avatar.url" :showInvites="false">
      <h1 :class="data.in_verifications === true ? 'verifired' : ''">{{ data.user_nickname }}</h1>
      <span class="sProfileHead__name">{{ data.display_name }}</span>
      <!-- TODO: Check online status -->
      <!-- <div class="sProfileHead__status online">Онлайн</div> -->
      <div class="sProfileHead__time">На сайте с {{ raitingUserStore.getRegisteredDate }}</div>

      <div class="row">
        <div v-for="league in data.leagues" class="col-auto">
          <Badge
            :severity="league.slug === 'atlants' ? 'secondary' : 'danger'"
            :value="league.name"
            class="p-badge-outline"
          />
        </div>
      </div>
    </CabinetProfileHead>
    <TeamBlock />
  </div>
  <!-- <h1 class="container" v-else>{{ raitingUserStore.error }}</h1> -->
</template>

<script setup>
  import TeamBlock from '../modules/ratings/components/TeamBlock';
  import { useBreadcrumbsStore } from '~/store/BreadcrumbStore';
  import { useRaitingUserStore } from '../modules/ratings/store/RaitingUserStore';
  import { useRaitingTeamStore } from '../modules/ratings/store/RaitingTeamStore';

  const route = useRoute();

  const breadcrumbsStore = useBreadcrumbsStore();
  const raitingUserStore = useRaitingUserStore();
  const raitingTeamStore = useRaitingTeamStore();

  const { data } = storeToRefs(raitingUserStore);

  console.log(route.params.id);

  await raitingUserStore.fetchUser(`/wp/v2/users/${route.params.id}`);
  await raitingTeamStore.fetchUserTeams(`/wp/v2/teams?member=${route.params.id}`);

  onMounted(() => {
    breadcrumbsStore.setNameFromIds(raitingUserStore.data.display_name);
    // breadcrumbsStore.setNameFromIds('sdasdsa');
  });

  useSeoMeta({
    title: raitingUserStore.data.user_nickname,
    // meta: [{ name: 'description', content: 'My amazing site.' }],
  });
</script>
