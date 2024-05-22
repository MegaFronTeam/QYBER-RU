import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';
import { getEmailErrorsList, getPasswordErrorsList } from '../utils/errorMessages';

export const useLoginStore = defineStore('login', () => {
  const router = useRouter();
  const disabledForm = ref(true);
  const globalStore = useGlobalStore();
  const serverErrors = ref('');

  const dataForm = ref({
    email: '',
    password: '',
  });

  const errors = ref({
    email: '',
    password: '',
  });

  const login = async () => {
    // if (!disabledForm.value) return;
    const response = await axios.post(`${BASE_URL}/auth/v1/login`, dataForm.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.data;
    if (data.status === false) {
      console.log(data.errors[0]);
      serverErrors.value = data.errors.join(' <br>');
    } else {
      globalStore.API_KEY = data[0];
      globalStore.email = dataForm.value.email;
      globalStore.isUserAuth = true;
      router.back();
    }
    console.log(data);
  };

  const validate = () => {
    serverErrors.value = '';
    const emailErrorsList = getEmailErrorsList(dataForm.value.email);
    const passwordErrorsList = getPasswordErrorsList(dataForm.value.password);

    errors.value.email = emailErrorsList.filter((error) => error !== '').join(' <br>');
    errors.value.password = passwordErrorsList.filter((error) => error !== '').join(' <br>');

    // disabledForm.value = errors.value.email !== '' || errors.value.password !== '';
    console.log(Object.values(errors.value));
    disabledForm.value = Object.values(errors.value).some((error) => error.length > 0);
  };

  watch(() => dataForm.value.email, validate);
  watch(() => dataForm.value.password, validate);

  return {
    disabledForm,
    // validate,
    login,
    dataForm,
    errors,
    serverErrors,
  };
});
