import { useRouter } from 'vue-router';
export const useGlobalStore = defineStore('global', () => {
  const router = useRouter();
  // const siteLoading = ref(false);
  const API_KEY = ref('');
  const email = ref('');
  const userData = ref({}); 
  const user_registered = ref('')
  const user_first_letter = ref('')
  const user_avatar = ref('')
  const leaguesOptions = ref([])
  const isSendVerification = ref(false)


  const  logout = () => {
    isUserAuth.value = false;
    API_KEY.value = '';
    email.value = '';
    userData.value = {};
    router.push('/');
  };

  return {
    API_KEY,
    email,
    userData,
    user_registered,
    user_avatar,
    user_first_letter,
    leaguesOptions,
    isSendVerification,
    logout
  };
}