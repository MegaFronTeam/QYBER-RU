import axios from 'axios';
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';
import { useAccreditationStore } from './accreditationStore';
// import { showToast } from '@/utils/showToast';
import { useTeamStore } from './TeamStore';

export const useUserStore = defineStore('user', () => {
  const globalStore = useGlobalStore();

  const router = useRouter();
  const accreditationStore = useAccreditationStore();
  const educational_institutions = ref([]);
  const TeamStore = useTeamStore();

  const showToast = (severity, summary, detail) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 10000,
    });
  };

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

      globalStore.userData = data;

      if (data.leagues === false) {
        globalStore.isAtlants = false;
        globalStore.isTalants = false;
      } else {
        globalStore.isAtlants = data.leagues.some((elem) => elem.slug === 'atlants');
        globalStore.isTalants = data.leagues.some((elem) => elem.slug === 'talants');
      }
      data.user_registered = data.user_registered.split(' ')[0].split('-').reverse().join('.');
      globalStore.in_verifications = globalStore.userData.in_verifications;
      // globalStore.user_avatar = data.user_avatar !== false ? data.user_avatar.sizes.medium : null;
      if (data.user_avatar) {
        globalStore.user_avatar = data.user_avatar.sizes.medium;
      }
      globalStore.user_first_letter = data.user_nickname[0].toUpperCase();

      if (data.user_verification) {
      }
      await TeamStore.fetchMyTeams();

      // getEducationalInstitutions();
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
      const data = await response.data;
      console.log(data);
      if (data.success === true) {
        console.log(2, data);
        // getUserData();
        globalStore.setIn_verification();
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
      if (error.response.data.message) showToast('error', 'Ошибка', error.response.data.message);

      return Promise.reject(error);
    }
  };

  const getEducationalInstitutions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/educations?per_page=100&page=1`);
      const data = await response.data.reduce((acc, item) => {
        acc.push({ id: item.id, title: item.title });
        return acc;
      }, []);

      educational_institutions.value.push(...data);

      // const pages = response.headers['x-wp-totalpages'];
      // for (let i = 2; i <= pages; i++) {
      //   const response = await axios.get(`${BASE_URL}/wp/v2/educations?per_page=100&page=${i}`);
      //   const data = await response.data;
      //   educational_institutions.value.push(...data);
      // }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  if (
    educational_institutions.value.length === 0 &&
    globalStore.userData.user_verification &&
    globalStore.userData.leagues.some((el) => el === 'atlants') === false
  ) {
    getEducationalInstitutions();
  }

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
    educational_institutions,
    getEducationalInstitutions,
  };
});
