<template>
  <div>
    <ProfileHead :breadcrumbArr="[{ label: 'Личный кабинет' }]">
      <h1 :class="userData.user_verification === true ? 'verifired' : ''">
        {{ userData.user_nicename }}
      </h1>
      <span class="sProfileHead__name">{{ userData.display_name }}</span>
      <div class="sProfileHead__status online">Онлайн</div>
      <div class="sProfileHead__time">На сайте с {{ userData.user_registered }}</div>
      <div class="row">
        <div class="col-auto">
          <Badge severity="secondary" value="Кибер Таланты" class="p-badge-outline" />
        </div>
        <div class="col-auto">
          <Badge severity="danger" value="Кибер Атланты" class="p-badge-outline" />
        </div>
      </div>
    </ProfileHead>
    <MyProfileBlock :profileData="userData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { $locally } = useNuxtApp();
import Auth from '@/services/auth';




const userData = ref({
  ID: '',
  user_login: '',

  user_email: '',

  user_registered: '',

  user_nicename: '',

  display_name: '',

  user_avatar: '',

  user_phone: '',

  user_birthday: '',

  user_gender: '',

  user_telegram: '',

  user_city: '',

  user_educational_institution: '',

  user_company: '',

  user_inn: '',

  user_verification: '',
});

Object.keys(userData.value).forEach((key) => {
  if ($locally.getItem(key)) {
    userData.value[key] = $locally.getItem(key);
  }
});
onMounted(() => {
  Auth.getMyProfileData().then((response) => {
    // console.log(response);

    Object.keys(userData.value).forEach((key) => {
      if (!$locally.getItem(key)) {
        $locally.setItem(key, response[key]);
        userData.value[key] = response[key];
      }
    });
  });
});
</script>
