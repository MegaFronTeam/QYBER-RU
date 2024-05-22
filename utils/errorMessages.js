export const getEmailErrorsList = (element) => {
  return [
    !element ? 'Заполни поле email ' : '',
    !element.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ) || element.length < 5
      ? 'Некорректный element'
      : '',
  ];
};

export const getPasswordErrorsList = (password) => {
  return [
    !password ? 'Заполни поле пароль' : '',
    password.length < 6 ? 'Пароль должен быть не менее 6 символов' : '',
    !password.match(/[0-9]/) ? 'Пароль должен содержать цифры' : '',
    !password.match(/[A-Z]/) ? 'Пароль должен содержать заглавные буквы' : '',
    !password.match(/[a-z]/) ? 'Пароль должен содержать строчные буквы' : '',
    !password.match(/[!@#$%^&*]/) ? 'Пароль должен содержать спецсимволы' : '',
  ];
};
