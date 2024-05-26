<template>
  <div v-if="globalStore.userData.user_nicename">
    <ProfileHead
      :breadcrumbArr="[{ label: 'Личный кабинет' }]"
      :img="imgRef"
      :avatarText="avatarText"
      :profileData="globalStore.userData"
    >
      <h1 :class="globalStore.userData.user_verification == true ? 'verifired' : ''">
        {{ globalStore.userData.user_nicename }}
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
    </ProfileHead>
    <MyProfileBlock />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import ProfileHead from '@/components/cabinet/ProfileHead.vue';
  import MyProfileBlock from '@/components/cabinet/MyProfileBlock.vue';
  import { useGlobalStore } from '@/store/globalStore';
  import { useUserStore } from '@/store/userStore';

  definePageMeta({
    breadcrumbName: 'Личный кабинет',
  });

  const userStore = useUserStore();

  import { useGlobalStore } from '@/store/globalStore';
  const globalStore = useGlobalStore();
  // console.log(userStore.userData);
  const imgRef = ref(null);
  const avatarText = ref(null);
  const user_registered = ref('');

  onMounted(async () => {
    await userStore.getUserData();
    imgRef.value = globalStore.user_avatar || { value: '' };
    avatarText.value = globalStore.user_first_letter;
  });
</script>
<style lang="scss"></style>
