import axios from 'axios'; 
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;  


export const useUserStore = defineStore('user', () => {
  const isUserAuth = ref(false);
  const router = useRouter();
  const API_KEY = ref('');
  const email = ref('');
  const userData = ref({}); 
  const user_registered = ref('')
  const user_avatar = ref('')
  const user_first_letter = ref('')

  const login = async (dataForm) => {
    const response = await axios.post(
      `${BASE_URL}/auth/v1/login`,
      dataForm,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data =  await response.data; 
    API_KEY.value = data[0];
    email.value = dataForm.email; 
    router.push('/my-profile');

  

    isUserAuth.value = true;

  };


  const getUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/v1/my`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${email.value}:${API_KEY.value}`),
        },
      });

      const data =  await response.data; 
      userData.value = data; 

      user_avatar.value = data.user_avatar.url;
      console.log(user_avatar.value);
      user_first_letter.value = data.user_nicename[0].toUpperCase();
    
      const date = new Date(data.user_registered);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      user_registered.value = new Intl.DateTimeFormat('ru-RU', options)
      .format(date)
      .split(' г.')[0];  


    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const  logout = () => {
    isUserAuth.value = false;
    API_KEY.value = '';
    email.value = '';
    userData.value = {};
    router.push('/');
  };

  const singUp = async (dataForm) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/v1/signup`,
        dataForm,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };


  return {
    API_KEY,
    email,
    userData,
    isUserAuth,
    login,
    user_registered,
    user_first_letter,
    user_avatar,
    getUserData,
    logout,
    singUp
  };
}, {persist: {storage: persistedState.localStorage,}});