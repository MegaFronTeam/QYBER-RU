import axios from 'axios'; 
import { useRouter } from 'vue-router';

const BASE_URL = import.meta.env.VITE_BASE_URL;  

import { useGlobalStore } from './globalStore';

export const useUserStore = defineStore('user', () => {
  const { isUserAuth, API_KEY, email, userData, user_registered, user_avatar, user_first_letter, leaguesOptions, isSendverification } = useGlobalStore();

  

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
      const formData = new FormData();
      Object.keys(dataForm).forEach((key) => {
        formData.append(key, dataForm[key]);
      });
      // formData.append('name', name.value);
      // formData.append('discipline', discipline.value);
      // formData.append('leagues', leagues.value);
      // formData.append('logo', logo.value);
      const response = await axios.post(
        `${BASE_URL}/auth/v1/signup`,
        formData,
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

  const sendVerification = async(dataForm) => {
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/verification`, dataForm, {
        headers: {
          Authorization: 'Basic ' + btoa(`${email.value}:${API_KEY.value}`),
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.data;
      isSendverification.value = data.success;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }





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
    singUp, 
    getLeagues,
    leaguesOptions,
    isSendverification,
    sendVerification
    
  };
}, {persist: {storage: persistedState.localStorage,}});