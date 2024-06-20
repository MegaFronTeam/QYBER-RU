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
    const user_first_letter = ref('');
    const user_avatar = ref(false);
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
    const isReferee = ref(false);

    const regions = ref([]);

    const contacts = ref({});
    const telegramPath = ref('');
    const DiscordServer = ref('');
    const tableRows = ref(10);

    const setAPI_KEY = (key) => {
      API_KEY.value = key;
    };

    const getContacts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/menu/v1/settings`);
        const data = await response.data;
        contacts.value = data.contacts;
        telegramPath.value = data.contacts.socials[0].link.split('//')[1];
        contacts.value.discord = data.contacts.socials.filter(
          (item) => item.social.value === 'discord',
        );
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
        data.map((element) => {
          delete element.acf;
          delete element.date;
          delete element.guid;
          delete element.link;
          delete element._links;
          delete element.modified;
          delete element.modified_gmt;

          return element;
        });
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
      isReferee.value = false;

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

    const getRegions = async () => {
      try {
        if (regions.value.length > 0) return;
        const response = await axios.get(`${BASE_URL}/wp/v2/subjects?per_page=100`);
        const data = await response.data;

        data.map((element) => {
          delete element.acf;
          delete element.date;
          delete element.guid;
          delete element.link;
          delete element._links;
          delete element.modified;
          delete element.modified_gmt;
          delete element.date_gmt;

          return element;
        });
        regions.value = data;
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    };

    const setIn_verification = () => {
      in_verifications.value = true;
    };

    getRegions();
    return {
      API_KEY,
      email,
      userData,
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
      setIn_verification,
      setAPI_KEY,
      tableRows,
      isReferee,
    };
  },
  { persist: { storage: persistedState.localStorage } },
);
