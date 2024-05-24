import axios from 'axios';
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useTeamStore } from './TeamStore';

export const useGlobalStore = defineStore(
  'global',
  () => {
    const router = useRouter();
    // const siteLoading = ref(false);
    const API_KEY = ref('');
    const email = ref('');
    const userData = ref({});
    const user_registered = ref('');
    const user_first_letter = ref('');
    const user_avatar = ref('');
    const leaguesOptions = ref([]);
    const isUserAuth = ref(false);
    const in_verifications = ref(false);
    const disciplineList = ref([]);
    const user_genderArr = ref([
      { name: 'Мужской', code: 'm' },
      { name: 'Женский', code: 'f' },
    ]);
    const isAtlants = ref(false);
    const isTalants = ref(false);

    const regions = ref([]);

    const contacts = ref({});
    const telegramPath = ref('');

    const getContacts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/menu/v1/settings`);
        const data = await response.data;
        contacts.value = data.contacts;
        telegramPath.value = data.contacts.socials[0].link.split('//')[1];
        // console.log('contact', contacts.value);
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    };
    getContacts();

    const getLeagues = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wp/v2/leagues`, {
          headers: {
            Authorization: 'Basic ' + btoa(`${email.value}:${API_KEY.value}`),
          },
        });
        const data = await response.data;
        leaguesOptions.value = data;
        // return response.data;
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    };

    if (leaguesOptions.value.length === 0) {
      getLeagues();
    }

    const logout = () => {
      API_KEY.value = '';
      email.value = '';
      userData.value = {};
      isUserAuth.value = false;
      useTeamStore.myTeams = [];
      useTeamStore.teamData = [];
      user_avatar.value = '';

      router.push('/');
    };

    const getDisciplines = async () => {
      const response = await axios.get(`${BASE_URL}/wp/v2/discipline`, {
        headers: {
          Authorization: 'Basic ' + btoa(`${email.value}:${API_KEY.value}`),
        },
      });
      const data = response.data;
      disciplineList.value = data;
    };

    const gerRegions = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/wp/v2/subjects?per_page=100`);
        const data = await response.data;
        // data.map((element) => {
        //   element.ID = +element.ID;
        //   element.post_title = element.title;
        // });
        regions.value = data;
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    };

    // const getEducationalInstitutions = async () => {
    //   try {
    //     const response = await axios.get(`${BASE_URL}/wp/v2/educations?per_page=100&page=1`);
    //     const data = await response.data;
    //     educational_institutions.value.push(...data);

    //     // const pages = response.headers['x-wp-totalpages'];
    //     // for (let i = 2; i <= pages; i++) {
    //     //   const response = await axios.get(`${BASE_URL}/wp/v2/educations?per_page=100&page=${i}`);
    //     //   const data = await response.data;
    //     //   educational_institutions.value.push(...data);
    //     // }
    //   } catch (error) {
    //     console.error(error);
    //     return Promise.reject(error);
    //   }
    // };
    // if (educational_institutions.value.length === 0) {
    //   getEducationalInstitutions();
    // }

    gerRegions();
    return {
      API_KEY,
      email,
      userData,
      user_registered,
      user_avatar,
      user_first_letter,
      leaguesOptions,
      logout,
      isUserAuth,
      in_verifications,
      disciplineList,
      telegramPath,
      getDisciplines,
      contacts,
      getContacts,
      user_genderArr,
      regions,
      // educational_institutions,
      isAtlants,
      isTalants,
    };
  },
  { persist: { storage: persistedState.localStorage } },
);
