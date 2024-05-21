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

  const regData = ref({
    email: '',
    password: '',
    passwordConfirm: '',
    agreement: true,
  });

  const login = async () => {
    const response = await axios.post(`${BASE_URL}/auth/v1/login`, dataForm.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.data;
    if (data.status === false) {
      console.log(data.errors[0]);
    } else {
      globalStore.API_KEY = data[0];
      globalStore.email = dataForm.value.email;
      globalStore.isUserAuth = true;
      router.back();
    }
    console.log(data);
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/v1/my`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
        },
      });

      const data = await response.data;
      console.log(data);
      globalStore.userData = data;

      globalStore.in_verifications = globalStore.userData.in_verifications;
      globalStore.user_avatar = data.user_avatar.url !== null ? data.user_avatar.url : [] ;
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

  const singUp = async () => {
    try {
      const formData = new FormData();
      Object.keys(regData.value).forEach((key) => {
        formData.append(key, regData.value[key]);
      });

      const response = await axios.post(`${BASE_URL}/auth/v1/signup`, formData, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.data;
      console.log(data);
      if (data.status === true) {
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const showInvite = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/v1/invite`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
        },
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const sendVerification = async (dataForm) => {
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/verification`, dataForm, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.data;
      if (data.success === true) {
        // getUserData();
        globalStore.in_verifications = true;
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const acceptInvite = async (dataForm) => {
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/invite`, dataForm, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
        },
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const declineInvite = async (dataForm) => {
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/decline`, dataForm, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
        },
      });
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  return {
    login,
    dataForm,
    getUserData,
    singUp,
    sendVerification,
    regData,
    email,
  };
});
