import { useGlobalStore } from '@/store/globalStore';

export default defineNuxtRouteMiddleware(async (to) => {
  const globalState = useGlobalStore();
  const { isUserAuth, isReferee, userData } = globalState;

  // console.log(to);
  // const  isUserAuth  = storeToRefs(globalState.isUserAuth);
  // const { $locally } = useNuxtApp();
  if (process.client && to.name !== undefined) {
    if (isUserAuth) {
      if (to.name.includes('auth')) {
        return navigateTo('/');
      }
    } else {
      if (to.name.includes('cabinet')) {
        return navigateTo('/auth/login');
      }
    }

    if (isUserAuth === false || isReferee === false) {
      if (to.name.includes('referee')) {
        return navigateTo('/');
      }
    }

    if (userData.user_verification === false) {
      if (to.name.includes('cabinet/team')) {
        return navigateTo('/');
      }
    }
  }
});
