import axios from 'axios';
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';
import { useAccreditationStore } from './accreditationStore';

export const useUserStore = defineStore('user', () => {
  const accreditationStore = useAccreditationStore();
  const router = useRouter();

  const showToast = (severity, summary, detail) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 10000,
    });
  };

  const globalStore = useGlobalStore();

  const email = ref('');
  const agreement = ref(true);

  const dataForm = ref({
    // email: 'wol1414@gmail.com',
    // password: 'Qwerty1414;',
    email: '',
    password: '',
    agreement: true,
  });

  const user_genderArr = ref([
    {
      value: 'f',
      label: ':Женский',
    },
    {
      value: 'm',
      label: 'Мужской',
    },
  ]);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/v1/my`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
        },
      });

      const data = await response.data;
      if (data.leagues === false) {
        globalStore.isAtlants = false;
        globalStore.isTalants = false;
      } else {
        globalStore.isAtlants = data.leagues.some((elem) => elem.slug === 'atlants');
        globalStore.isTalants = data.leagues.some((elem) => elem.slug === 'talants');
      }
      data.user_registered = data.user_registered.split(' ')[0].split('-').reverse().join('.');
      globalStore.userData = data;
      globalStore.in_verifications = globalStore.userData.in_verifications;
      if (data.user_avatar) {
        globalStore.user_avatar = data.user_avatar.url;
      } else [(globalStore.user_avatar = '')];
      globalStore.user_first_letter = data.user_nickname[0].toUpperCase();
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const updateMyProfileData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/update`, globalStore.userData, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
        },
      });
      const data = await response.data;
      console.log(data);
      if (data === true) {
        showToast('success', 'Данные успешно изменены');
        await getUserData();
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

  // const dataVerification = ref({
  //   inn: '',
  //   leagues: [],
  //   file: '',
  //   selectedWorkStudy: '',
  //   file: {},
  //   user_educational_institution: '',
  //   user_company: '',
  // });
  const sendVerification = async () => {
    console.log(accreditationStore.data);

    const formData = new FormData();
    Object.keys(accreditationStore.data).forEach((key) => {
      formData.append(key, accreditationStore.data[key]);
    });
    try {
      const response = await axios.post(`${BASE_URL}/profile/v1/verification`, formData, {
        headers: {
          Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
          'Content-Type': 'multipart/form-data',
        },
      });
      const data = await response;
      console.log(data);
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

  // Update password
  const disabledUpdatePassword = ref(false);
  const serverErrorsPassword = ref('');

  const toast = useToast();

  const passwordData = ref({
    current_password: '',
    new_password: '',
    repeat_password: '',
  });
  const updatePassword = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/profile/v1/update-password`,
        passwordData.value,
        {
          headers: {
            Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
          },
        },
      );
      const data = await response.data;

      console.log(data);
      if (data.status === true) {
        showToast('success', 'Пароль успешно изменен');
        passwordData.value = {
          current_password: '',
          new_password: '',
          repeat_password: '',
        };
      }
      // return response.data;
    } catch (error) {
      console.error(error);
      if (error.response.data.errors) {
        Object.values(error.response.data.errors).forEach((error) => {
          showToast('error', 'Ошибка', error);
        });
      }
      if (error.response.data.message) showToast('Ошибка', error.response.data.message);

      return Promise.reject(error);
    }
  };

  return {
    dataForm,
    getUserData,
    sendVerification,
    // regData,
    email,
    passwordData,
    updateMyProfileData,
    updatePassword,
    agreement,
    user_genderArr,
    disabledUpdatePassword,
  };
});
