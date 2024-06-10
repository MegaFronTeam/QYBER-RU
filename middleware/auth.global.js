import { useGlobalStore } from '@/store/globalStore';

export default defineNuxtRouteMiddleware(async (to) => {
  const globalState = useGlobalStore();
  const isUserAuth = globalState.isUserAuth;
  // console.log(to);
  // const  isUserAuth  = storeToRefs(globalState.isUserAuth);
  // const { $locally } = useNuxtApp();
  if (process.client && to.name !== undefined) {
    if (isUserAuth) {
      console.log(1);
      if (to.name.includes('auth')) {
        return navigateTo('/');
      }
    } else {
      console.log(2);
      if (to.name.includes('cabinet')) {
        return navigateTo('/auth/login');
      }
    }
  }
});
