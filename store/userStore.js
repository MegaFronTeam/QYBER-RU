import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const router = useRouter();
import { useStorage } from '@vueuse/core'


export const useUserStore = defineStore('user', () => {
  const API_KEY = ref('');
  const email = ref('');
  const userData = ref({});


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
    console.log(dataForm.email);
    const data =  await response.data; 
    API_KEY.value = data[0];
    email.value = dataForm.email;
    // router.push('/my-profile');
  };


  const getUserData = async () => {
    console.log(email.value, API_KEY.value);
    try {
      const response = await axios.get(`${BASE_URL}/profile/v1/my`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${email.value}:${API_KEY.value}`),
        },
      });

      const data =  await response.data; 
      userData.value = data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
  // watch(() => API_KEY, (state) => {
  //   localStorage.setItem('API_KEY', state);
  // });

  // watch(() => email, (state) => {
  //   localStorage.setItem('email', state);
  // });

  // watch(() => userData, (state) => {
  //   localStorage.setItem('userData', JSON.stringify(state));
  // });



  return {
    API_KEY,
    email,
    userData,
    login,
    getUserData,
  };
}, {persist: true});