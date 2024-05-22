import { defineStore } from 'pinia';
import { useUserStore } from '@/store/userStore';
import { get } from '@vueuse/core';

export const useValidateLoginStore = defineStore('validateLogin', () => {
  const userStore = useUserStore();
  const disabledBtn = ref(true);

  const errors = ref({
    email: '',
    password: '',
  });

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

  const emailValidation = (element) => {
    const errorsList = getEmailErrorsList.bind(null, element)();
    errors.value.email = errorsList.filter((error) => error !== '').join(' <br>');
    // disabledBtn.value = errorsList.every((error) => error === '');
  };

  const validatePassword = (element) => {
    const passwordErrors = getPasswordErrorsList.bind(null, element)();
    errors.value.password = passwordErrors.filter((error) => error !== '').join(' <br>');
    // disabledBtn.value = passwordErrors.every((error) => error === '');
  };

  watch(() => userStore.dataForm.email, emailValidation.bind(null, userStore.dataForm.email));
  watch(
    () => userStore.dataForm.password,
    validatePassword.bind(null, userStore.dataForm.password),
  );

  return {
    disabledBtn,
    // validate,
    errors,
  };
});
