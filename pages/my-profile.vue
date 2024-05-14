<template>
  <div>
    <ProfileHead :breadcrumbArr="[{ label: 'Личный кабинет' }]">
      <h1 class="verifired">{{ data.user_nicename }}</h1>
      <span class="sProfileHead__name">Михаил Иванов</span>
      <div class="sProfileHead__status online">Онлайн</div>
      <div class="sProfileHead__time">На сайте с 20 декабря 2023</div>
      <div class="row">
        <div class="col-auto">
          <Badge severity="secondary" value="Кибер Таланты" class="p-badge-outline" />
        </div>
        <div class="col-auto">
          <Badge severity="danger" value="Кибер Атланты" class="p-badge-outline" />
        </div>
      </div>
    </ProfileHead>
    <MyProfileBlock />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const { $locally } = useNuxtApp();
// import Auth from '@/services/auth';

// const profileData = ref();
// Auth.myProfile().then((response) => {
//   data.value = response;
//   // console.log(response);
// });

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = $locally.getItem('token');
const email = 'janis.paberzs18@gmail.com';

const myHeaders = new Headers();
const encodeToken = btoa(`${email}:${API_KEY}`);

myHeaders.append('Authorization', `Basic ${encodeToken}`);

const requestOptions = {
  'Content-Type': 'application/json',
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

const { data } = await useFetch(`${BASE_URL}/profile/v1/my`, requestOptions);
console.log(data);
</script>
