import { useGlobalStore } from '@/store/globalStore';

export default defineNuxtRouteMiddleware(async (to) => {
  const globalState = useGlobalStore();
  const isUserAuth = globalState.isUserAuth;
  // const  isUserAuth  = storeToRefs(globalState.isUserAuth);
  // const { $locally } = useNuxtApp();
  if (process.client) {
    if (isUserAuth) {
      if (to.name.includes('auth')) {
        console.log(11);
        return navigateTo('/');
      }
    } else {
      if (to.name.includes('cabinet')) {
        return navigateTo('/auth/login');
      }
    }
  }
});
