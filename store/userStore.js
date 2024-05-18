import axios from 'axios'; 
import { useRouter } from 'vue-router';

const BASE_URL = import.meta.env.VITE_BASE_URL;  

import { useGlobalStore } from './globalStore';

export const useUserStore = defineStore('user', () => {
  const globalStore = useGlobalStore();

  

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
    globalStore.API_KEY.value = data[0];
    globalStore.email.value = dataForm.email; 
    router.push('/my-profile');

  

    globalStore.isUserAuth.value = true;

  };

  

  const getUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/v1/my`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email.value}:${globalStore.API_KEY.value}`),
        },
      });

      const data =  await response.data; 
      globalStore.userData.value = data; 

      globalStore.user_avatar.value = data.user_avatar.url;
      console.log(globalStore.user_avatar.value);
      globalStore.user_first_letter.value = data.user_nicename[0].toUpperCase();
    
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
        Authorization: 'Basic ' + btoa(`${globalStore.email.value}:${globalStore.API_KEY.value}`),
      },
      });
      const data = await response.data;
      globalStore.leaguesOptions.value = data;
      // return response.data; 
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }
  if(globalStore.leaguesOptions.value.length === 0){
    getLeagues();
  }

  const sendVerification = async(dataForm) => {
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/verification`, dataForm, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email.value}:${globalStore.API_KEY.value}`),
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.data;
      globalStore.isSendVerification.value = data.success;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }





  return {
    API_KEY: globalStore.API_KEY,
    email: globalStore.email,
    userData: globalStore.userData,
    isUserAuth,
    login,
    user_registered,
    user_first_letter: globalStore.user_first_letter,
    user_avatar: globalStore.user_avatar,
    getUserData,
    logout,
    singUp, 
    getLeagues,
    leaguesOptions: globalStore.leaguesOptions,
    isSendverification,
    sendVerification
    
  };
}, {persist: {storage: persistedState.localStorage,}});