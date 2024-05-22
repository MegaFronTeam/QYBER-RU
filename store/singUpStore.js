import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';
import { useUserStore } from './userStore';
import { getEmailErrorsList, getPasswordErrorsList } from '../utils/errorMessages';

export const useSingUpStore = defineStore('login', () => {
  const router = useRouter();
  const disabledForm = ref(true);
  const userStore = useUserStore();
  const globalStore = useGlobalStore();
  const serverErrors = ref('');

  const dataForm = ref({
    email: 'wol1414@gmail.com',
    password: 'Qwerty1414;#',
    passwordConfirm: 'Qwerty1414;#',

    // email: '',
    // password: '',
    // passwordConfirm: '',
  });

  const errors = ref({
    email: '',
    password: '',
    passwordConfirm: '',
    // agreement: '',
  });

  const submit = async () => {
    // if (!disabledForm.value) return;
    try {
      const formData = new FormData();
      Object.keys(dataForm.value).forEach((key) => {
        formData.append(key, dataForm.value[key]);
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
        serverErrors.value = Object.values(data.errors).join(' <br>');
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const validate = () => {
    serverErrors.value = '';
    const emailErrorsList = getEmailErrorsList(dataForm.value.email);
    const passwordErrorsList = getPasswordErrorsList(dataForm.value.password);

    errors.value.email = emailErrorsList.filter((error) => error !== '').join(' <br>');
    errors.value.password = passwordErrorsList.filter((error) => error !== '').join(' <br>');

    errors.value.passwordConfirm =
      dataForm.value.password.trim() === dataForm.value.passwordConfirm.trim()
        ? ''
        : 'Пароли не совпадают';

    // disabledForm.value = errors.value.email !== '' || errors.value.password !== '';
    console.log(Object.values(errors.value), userStore.agreement.length);
    console.log(
      Object.values(errors.value).some((error) => error.length > 0),
      userStore.agreement.length < 1,
    );

    disabledForm.value =
      Object.values(errors.value).some((error) => error.length > 0) ||
      userStore.agreement.length === 0;
  };

  // Массив
  watch(dataForm.value, validate);
  // Один элемент
  watch(() => userStore.agreement, validate);

  return {
    disabledForm,
    validate,
    dataForm,
    errors,
    serverErrors,
    submit,
  };
});
