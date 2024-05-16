<template>
  <div>
    <div class="container head-messages">
      <Acredition v-if="userData.user_verification === false" />
    </div>
    <ProfileHead :breadcrumbArr="[{ label: 'Личный кабинет' }]" :profileData="userData">
      <h1 :class="userData.user_verification == true ? 'verifired' : ''">
        {{ userData.user_nicename }}
      </h1>
      <span class="sProfileHead__name">{{ userData.display_name }}</span>
      <div class="sProfileHead__status online">Онлайн</div>
      <div class="sProfileHead__time">На сайте с {{ user_registered }}</div>
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

const user_registered = ref('');

Object.keys(userData.value).forEach((key) => {
  if ($locally.getItem(key)) {
    userData.value[key] = $locally.getItem(key);
  }
});
if ($locally.getItem('user_registered')) {
  const date = new Date($locally.getItem('user_registered'));
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  user_registered.value = new Intl.DateTimeFormat('ru-RU', options).format(date).split(' г.')[0];
}

onMounted(() => {
  Auth.getMyProfileData().then((response) => {
    console.log(response);
    Object.keys(userData.value).forEach((key) => {
      if (!$locally.getItem(key) || $locally.getItem(key) != response[key]) {
        $locally.setItem(key, response[key]);
        userData.value[key] = response[key];
      }
    });
    if (!user_registered.value) {
      const date = new Date(response.user_registered);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      user_registered.value = new Intl.DateTimeFormat('ru-RU', options)
        .format(date)
        .split(' г.')[0];
    }
  });
});
</script>
<style lang="scss">
.head-messages {
  .p-message-warn .p-message-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
    flex-wrap: wrap;
  }
}
</style>
