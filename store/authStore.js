import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';
import { useUserStore } from './userStore';
import { getEmailErrorsList, getPasswordErrorsList } from '~/utils/errorMessages';
import { is } from 'date-fns/locale';
import Cookies from 'js-cookie';

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

      console.log('API_KEY', data[0]);
      console.log('email', dataFormLogin.value.email);

      Cookies.set('API_KEY', data[0], { domain: 'api.qyber.ru' });
      Cookies.set('email', dataFormLogin.value.email, { domain: 'api.qyber.ru' });
      userStore.getUserData();
      router.back();
    }
    // console.log(data);
  };

  const validateLogin = () => {
    serverErrorsLogin.value = '';
    const emailErrorsList = getEmailErrorsList(dataFormLogin.value.email);
    const passwordErrorsList = getPasswordErrorsList(dataFormLogin.value.password, true);

    errorsLogin.value.email = emailErrorsList.filter((error) => error !== '').join(' <br>');
    errorsLogin.value.password = passwordErrorsList.filter((error) => error !== '').join(' <br>');

    // disabledForm.value = errors.value.email !== '' || errors.value.password !== '';
    disabledFormLogin.value = Object.values(errorsLogin.value).some((error) => error);
  };

  //SingUp Store
  const disabledFormSingUp = ref(true);
  const serverErrorsSingUp = ref('');
  const dataFormSingUp = ref({
    email: '',
    password: '',
    passwordConfirm: '',
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
        router.push('/auth/login');
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

    disabledFormSingUp.value =
      Object.values(errorsSingUp.value).some((error) => error) || userStore.agreement === false;
  };

  // reset password send email
  const disabledFormResetPassword = ref(true);
  const serverErrorsFormResetPassword = ref('');
  const dataFormResetPassword = ref({
    email: '',
  });

  const errorsResetFormPassword = ref({
    email: '',
  });

  const isSendEmail = ref(false);
  const setIsSendEmail = () => {
    isSendEmail.value = false;
  };

  const submitResetPassword = async () => {
    // if (disabledForm.value) return;
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/v1/reset-password`,
        dataFormResetPassword.value,
        {
          headers: {
            Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const data = await response.data;
      console.log(data);
      if (data === true) {
        isSendEmail.value = true;
      } else {
        serverErrorsFormResetPassword.value = Object.values(data.errors).join(' <br>');
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const validateResetPassword = () => {
    serverErrorsFormResetPassword.value = '';
    const emailErrorsList = getEmailErrorsList(dataFormResetPassword.value.email);

    errorsResetFormPassword.value.email = emailErrorsList
      .filter((error) => error !== '')
      .join(' <br>');

    // disabledForm.value = errors.value.email !== '' || errors.value.password !== '';
    disabledFormResetPassword.value = Object.values(errorsResetFormPassword.value).some(
      (error) => error,
    );
  };

  //NewPassword Store
  const disabledFormNewPassword = ref(true);
  const serverErrorsNewPassword = ref('');
  const dataFormNewPassword = ref({
    key: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const ifKeyEmail = computed(() => {
    console.log(router.currentRoute.value.query.key, router.currentRoute.value.query.email);
    if (
      router.currentRoute.value.query.key === undefined ||
      router.currentRoute.value.query.email === undefined
    ) {
      return false;
    }
    return (
      router.currentRoute.value.query.key.length > 0 &&
      router.currentRoute.value.query.email.length > 0
    );
  });

  const errorsNewPassword = ref({
    password: '',
    passwordConfirm: '',
    // agreement: '',
  });

  const isSendNewPassword = ref(false);

  const submitNewPassword = async () => {
    // if (!disabledForm.value) return;
    try {
      const formData = new FormData();
      Object.keys(dataFormNewPassword.value).forEach((key) => {
        formData.append(key, dataFormNewPassword.value[key]);
      });

      const response = await axios.post(`${BASE_URL}/auth/v1/set-password`, formData, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response.data;
      console.log(data);
      if (data.status === true) {
        isSendNewPassword.value = true;
      } else {
        serverErrorsNewPassword.value = Object.values(data.errors).join(' <br>');
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const validateNewPassword = () => {
    serverErrorsNewPassword.value = '';
    const emailErrorsList = getEmailErrorsList(dataFormNewPassword.value.email);
    const passwordErrorsList = getPasswordErrorsList(dataFormNewPassword.value.password);

    errorsNewPassword.value.password = passwordErrorsList
      .filter((error) => error !== '')
      .join(' <br>');

    errorsNewPassword.value.passwordConfirm =
      dataFormNewPassword.value.password.trim() === dataFormNewPassword.value.passwordConfirm.trim()
        ? ''
        : 'Пароли не совпадают';

    disabledFormNewPassword.value =
      Object.values(errorsNewPassword.value).some((error) => error) ||
      userStore.agreement === false;
  };

  // Массив
  watch(dataFormSingUp.value, validateSingUp);
  // Один элемент
  watch(() => userStore.agreement, validateSingUp);
  // /SingUp Store

  watch(dataFormLogin.value, validateLogin);

  watch(dataFormResetPassword.value, validateResetPassword);

  watch(dataFormNewPassword.value, validateNewPassword);
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

    validateResetPassword,
    disabledFormResetPassword,
    submitResetPassword,
    dataFormResetPassword,
    errorsResetFormPassword,
    serverErrorsFormResetPassword,

    isSendEmail,
    setIsSendEmail,

    validateNewPassword,
    disabledFormNewPassword,
    submitNewPassword,
    dataFormNewPassword,
    errorsNewPassword,
    serverErrorsNewPassword,

    ifKeyEmail,
    isSendNewPassword,
  };
});
