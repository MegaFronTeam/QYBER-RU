// import { useUserStore } from '@/store/userStore';

export default defineNuxtRouteMiddleware(async (to) => { 
  const loginPages = [
    'login',
    'registration',
    'forgot-password',
    'reset-password',
    'confirm-email',
    'confirm-phone',
    'confirm-code',
    'confirm-success',
    'confirm-error',
  ];
  
  const profilePages = [
    'my-profile',
    'profile-edit',
    'profile-password',
    'profile-contacts',
    'profile-contacts-edit',
    'profile-contacts-add',
    'profile-contacts-delete',
    'profile-contacts-success',
    'profile-contacts-error',
  ];
  
  // if (process.client) {
  //     const isAuth = useUserStore.API_KEY !== '';
  //     const user_email = useUserStore.email ;
  //   if (isAuth && user_email) {
  //     if (loginPages.includes(to.name)) { 
  //       return navigateTo('/');
  //     }
  //   } else {
  //     if (profilePages.includes(to.name)) {
  //       return  navigateTo('/login');
  //     }
  //   }
  //   }
});