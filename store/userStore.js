import axios from 'axios'; 
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;  
import { useGlobalStore } from './globalStore';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const globalStore = useGlobalStore();
  const email = ref('');

  const dataForm = ref({
    // email: 'wol1414@gmail.com',
    // password: 'Qwerty1414;',
    email: '',
    password: '',
    agreement: true,
  });

  const login = async () => {
    const response = await axios.post(
      `${BASE_URL}/auth/v1/login`,
      dataForm.value,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data =  await response.data;
    console.log(data);
    router.push('/my-profile');
    globalStore.API_KEY = data[0];
    globalStore.email = dataForm.value.email; 
    globalStore.isUserAuth = true;
    globalStore.in_verifications = data[1].in_verifications;
  };


  const getUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/v1/my`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
        },
      });

      const data =  await response.data; 
      globalStore.userData = data; 

      globalStore.user_avatar = data.user_avatar.url;
      globalStore.user_first_letter = data.user_nicename[0].toUpperCase();
    
      const date = new Date(data.user_registered);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      globalStore.user_registered = new Intl.DateTimeFormat('ru-RU', options)
      .format(date)
      .split(' г.')[0];  


    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  // if(globalStore.isUserAuth){
  //   getUserData();
  // }
  // const  logout = () => {
  //   globalStore.isUserAuth.value = false;
  //   globalStore.API_KEY = '';
  //   globalStore.email = '';
  //   globalStore.userData.value = {};
  //   router.push('/');
  // };

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





  const sendVerification = async(dataForm) => {
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/verification`, dataForm, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.data;
      if(data.success === true){
        // getUserData(); 
        globalStore.in_verifications = true;
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }





  return {
    login,
    dataForm,
    getUserData,
    singUp,
    sendVerification,
    email
  };
});