<template>
  <div v-if="userData.user_nicename">
    <CabinetProfileHead
      :breadcrumbArr="[{ label: 'Личный кабинет' }]"
      :img="user_avatar"
      :avatarText="user_first_letter"
      :profileData="userData"
    >
      <h1 :class="userData.user_verification == true ? 'verifired' : ''">
        {{ userData.user_nicename }}
      </h1>
      <span class="sProfileHead__name">{{ userData.display_name }}</span>
      <div class="sProfileHead__status online">Онлайн</div>
      <div class="sProfileHead__time">На сайте с {{ userData.user_registered }}</div>

      <div class="row" v-if="userData.leagues">
        <div class="col-auto" v-for="item in userData.leagues" :key="item.slug">
          <!-- <Badge
            severity="{ secondary: item.slug == 'atlants', danger: item.slug == 'talants' }"
            :value="item.name"
            class="p-badge-outline"
          /> -->

          <Badge
            v-if="item.slug === 'atlants'"
            severity="secondary"
            :value="item.name"
            class="p-badge-outline"
          />
          <Badge
            v-if="item.slug === 'talants'"
            severity="danger"
            :value="item.name"
            class="p-badge-outline"
          />
        </div>
      </div>
    </CabinetProfileHead>
    <CabinetMyProfileBlock />
  </div>
</template>

<script setup>
  import { useGlobalStore } from '@/store/globalStore';
  import { useUserStore } from '@/store/userStore';

  const userStore = useUserStore();

  const globalStore = useGlobalStore();

  const { userData, user_first_letter, user_avatar } = storeToRefs(globalStore);
  definePageMeta({
    breadcrumbName: 'Личный кабинет',
  });

  await userStore.getUserData();
</script>
<style lang="scss"></style>
