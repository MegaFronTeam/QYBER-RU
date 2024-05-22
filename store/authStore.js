import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';
import { useUserStore } from './userStore';
import { getEmailErrorsList, getPasswordErrorsList } from '../utils/errorMessages';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const disabledFormLogin = ref(true);
  const globalStore = useGlobalStore();
  const serverErrorsLogin = ref('');

  const userStore = useUserStore();

  const dataFormLogin = ref({
    email: '',
    password: '',
  });

  const errorsLogin = ref({
    email: '',
    password: '',
  });

  const submitLogin = async () => {
    // if (disabledForm.value) return;
    const response = await axios.post(`${BASE_URL}/auth/v1/login`, dataFormLogin.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.data;
    if (data.status === false) {
      console.log(data.errors[0]);
      serverErrorsLogin.value = data.errors.join(' <br>');
    } else {
      globalStore.API_KEY = data[0];
      globalStore.email = dataFormLogin.value.email;
      globalStore.isUserAuth = true;
      router.back();
    }
    console.log(data);
  };

  const validateLogin = () => {
    serverErrorsLogin.value = '';
    const emailErrorsList = getEmailErrorsList(dataFormLogin.value.email);
    const passwordErrorsList = getPasswordErrorsList(dataFormLogin.value.password);

    errorsLogin.value.email = emailErrorsList.filter((error) => error !== '').join(' <br>');
    errorsLogin.value.password = passwordErrorsList.filter((error) => error !== '').join(' <br>');

    // disabledForm.value = errors.value.email !== '' || errors.value.password !== '';
    console.log(Object.values(errorsLogin.value));
    disabledFormLogin.value = Object.values(errorsLogin.value).every((error) => error.length > 0);
  };

  //SingUp Store
  const disabledFormSingUp = ref(true);
  const serverErrorsSingUp = ref('');
  const dataFormSingUp = ref({
    email: 'wol1414@gmail.com',
    password: 'Qwerty1414;#',
    passwordConfirm: 'Qwerty1414;#',

    // email: '',
    // password: '',
    // passwordConfirm: '',
  });

  const errorsSingUp = ref({
    email: '',
    password: '',
    passwordConfirm: '',
    // agreement: '',
  });

  const submitSingUp = async () => {
    // if (!disabledForm.value) return;
    try {
      const formData = new FormData();
      Object.keys(dataFormSingUp.value).forEach((key) => {
        formData.append(key, dataFormSingUp.value[key]);
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
      } else {
        serverErrorsSingUp.value = Object.values(data.errors).join(' <br>');
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const validateSingUp = () => {
    serverErrorsSingUp.value = '';
    const emailErrorsList = getEmailErrorsList(dataFormSingUp.value.email);
    const passwordErrorsList = getPasswordErrorsList(dataFormSingUp.value.password);

    errorsSingUp.value.email = emailErrorsList.filter((error) => error !== '').join(' <br>');
    errorsSingUp.value.password = passwordErrorsList.filter((error) => error !== '').join(' <br>');

    errorsSingUp.value.passwordConfirm =
      dataFormSingUp.value.password.trim() === dataFormSingUp.value.passwordConfirm.trim()
        ? ''
        : 'Пароли не совпадают';

    // disabledFormSingUp.value = errorsSingUp.value.email !== '' || errorsSingUp.value.password !== '';
    console.log(Object.values(errorsSingUp.value), userStore.agreement.length);
    console.log(
      Object.values(errorsSingUp.value).every((error) => error.length > 0),
      userStore.agreement === false,
    );

    disabledFormSingUp.value =
      Object.values(errorsSingUp.value).every((error) => error.length > 0) ||
      userStore.agreement === false;
  };

  // Массив
  watch(dataFormSingUp.value, validateSingUp);
  // Один элемент
  watch(() => userStore.agreement, validateSingUp);
  // /SingUp Store

  if (dataFormSingUp.email !== '' && dataFormSingUp.password !== '') {
    validateSingUp();
  }

  if (dataFormLogin.email !== '' && dataFormLogin.password !== '') {
    validateLogin();
  }
  watch(dataFormLogin.value, validateLogin);

  return {
    disabledFormLogin,
    validateLogin,
    submitLogin,
    dataFormLogin,
    errorsLogin,
    serverErrorsLogin,

    validateSingUp,
    disabledFormSingUp,
    submitSingUp,
    dataFormSingUp,
    errorsSingUp,
    serverErrorsSingUp,
  };
});
