import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';

export const useLoginStore = defineStore('login', () => {
  const router = useRouter();
  const disabledForm = ref(true);
  const globalStore = useGlobalStore();

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
    } else {
      globalStore.API_KEY = data[0];
      globalStore.email = dataForm.value.email;
      globalStore.isUserAuth = true;
      router.back();
    }
    console.log(data);
  };

  const getEmailErrorsList = (element) => {
    return [
      !element ? 'Заполни поле email ' : '',
      !element.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ) || element.length < 5
        ? 'Некорректный element'
        : '',
    ];
  };

  const getPasswordErrorsList = (password) => {
    return [
      !password ? 'Заполни поле пароль' : '',
      password.length < 6 ? 'Пароль должен быть не менее 6 символов' : '',
      !password.match(/[0-9]/) ? 'Пароль должен содержать цифры' : '',
      !password.match(/[A-Z]/) ? 'Пароль должен содержать заглавные буквы' : '',
      !password.match(/[a-z]/) ? 'Пароль должен содержать строчные буквы' : '',
      !password.match(/[!@#$%^&*]/) ? 'Пароль должен содержать спецсимволы' : '',
    ];
  };

  const validate = () => {
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
  };
});
