<template>
  <NuxtLayout> 
      <NuxtPage /> 
  </NuxtLayout>
</template>

<style>
@import './assets/scss/normalize.scss';
@import './assets/scss/main.scss';
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.1s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<script setup>
import { onMounted } from 'vue';

const {$locally} = useNuxtApp();
const router = useRouter();



router.beforeEach((to) => {
  const  loginPages = [
    'login',
    'registration',
    'forgot-password',
    'reset-password',
    'confirm-email',
    'confirm-phone',
    'confirm-code',
    'confirm-success',
    'confirm-error',
  ]
  
  const profilePages = [
    'myProfile',
    'profile-edit',
    'profile-password',
    'profile-contacts',
    'profile-contacts-edit',
    'profile-contacts-add',
    'profile-contacts-delete',
    'profile-contacts-success',
    'profile-contacts-error',
  ]
  const isAuth = $locally.getItem('token');
  console.log(to.name);
  if (isAuth) { 
    if (loginPages.includes(to.name)) {
      return '/'
    }
  } else {
    if (profilePages.includes(to.name)) {
      return '/login'
    }
  }
})


onMounted(() => {
  const { $locally } = useNuxtApp();
  if ($locally.getItem('theme') === 'light-theme') {
    document.documentElement.setAttribute('data-theme', 'light-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark-theme');
  }
});
</script>
