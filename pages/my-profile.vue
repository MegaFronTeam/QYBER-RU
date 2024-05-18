<template>
  <div>
    <div class="container head-messages">
      <Acredition v-if="userData.user_verification === false" />
    </div>
    <ProfileHead
      :breadcrumbArr="[{ label: 'Личный кабинет' }]"
      :img="imgRef"
      :avatarText="avatarText"
    >
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
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore();
// console.log(userStore.userData);
const imgRef = ref(null);
const avatarText = ref(null);
const userData = ref({});
const user_registered = ref('');

// Object.keys(userData.value).forEach((key) => {
//   if ($locally.getItem(key)) {
//     userData.value[key] = $locally.getItem(key);
//   }
// });

// if ($locally.getItem('user_registered')) {
//   const date = new Date($locally.getItem('user_registered'));
//   const options = { day: 'numeric', month: 'long', year: 'numeric' };
//   user_registered.value = new Intl.DateTimeFormat('ru-RU', options).format(date).split(' г.')[0];
// }

onMounted(async() => {
  // if($locally.getItem('user_avatar')) {
  //   imgRef.value = $locally.getItem('user_avatar');
  // }  
  userStore.getUserData();
  imgRef.value = userStore.userData.user_avatar.url;
  avatarText.value = userStore.userData.user_nicename[0];
  userData.value = userStore.userData;
  

  // Auth.getMyProfileData().then((response) => {
  //   // console.log(response); 
  //   // if(!$locally.getItem('user_avatar') || $locally.getItem('user_avatar') != response['user_avatar'].url) { 
  //   //   $locally.setItem('user_avatar', response['user_avatar'].url);
  //   //   imgRef.value = response['user_avatar'].url;
  //   // }  
  //   Object.keys(response).forEach((key) => {  
  //       userData.value[key] = response[key]; 
  //   });

  //   // Object.keys(userData.value).forEach((key) => {
  //   //   if (!$locally.getItem(key) || $locally.getItem(key) != response[key]) { 
  //   //       $locally.setItem(key, response[key]);
  //   //       userData.value[key] = response[key]; 
  //   //   }
  //   // });
  //   // if(!$locally.getItem('user_avatar') || $locally.getItem('user_avatar') != response.user_avatar) {
  //   //   $locally.setItem('user_avatar', response.user_avatar.url);
  //   //   imgRef.value = response.user_avatar.url;
  //   // }
  //   avatarText.value = response.user_nicename[0];
  //   imgRef.value = response['user_avatar'].url;
  //   console.log('imgRef', imgRef.value);
  // // } 
  //   if (!user_registered.value) {
  //     const date = new Date(response.user_registered);
  //     const options = { day: 'numeric', month: 'long', year: 'numeric' };
  //     user_registered.value = new Intl.DateTimeFormat('ru-RU', options)
  //       .format(date)
  //       .split(' г.')[0];
  //   }
  // });
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
