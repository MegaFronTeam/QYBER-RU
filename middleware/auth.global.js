
export default defineNuxtRouteMiddleware(async (to) => { 
  const { $locally } = useNuxtApp();
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
    const isAuth = $locally.getItem('token');
    const email = $locally.getItem('user_email');

    if (process.client) {
    console.log(1, isAuth, email); 
    if ($locally.getItem('token') && $locally.getItem('user_email')) {
      if (loginPages.includes(to.name)) {
        return navigateTo('/');
      }
      else{
        return;
      }
    } else {
      console.log(2, $locally.getItem('token'), $locally.getItem('user_email')); 
      if (profilePages.includes(to.name)) {
        return  navigateTo('/login');
      }
    }
    }
});