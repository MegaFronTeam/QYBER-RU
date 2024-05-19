import axios from 'axios'; 
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  const isUserAuth = ref(false)
  const in_verifications = ref(false)

  const getLeagues = async () => {
    try {
  const response = await axios.get(`${BASE_URL}/wp/v2/leagues`, {
    headers: {
      Authorization: 'Basic ' + btoa(`${email.value}:${API_KEY.value}`),
    },
    });
    const data = await response.data;
    leaguesOptions.value = data;
    // return response.data; 
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
  }

  if(leaguesOptions.value.length === 0){
    getLeagues();
  }

  const  logout = () => { 
    API_KEY.value = '';
    email.value = '';
    userData.value = {};
    isUserAuth.value = false;
    
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
    logout,
    isUserAuth,
    in_verifications
  };
}, {persist: {storage: persistedState.localStorage}});