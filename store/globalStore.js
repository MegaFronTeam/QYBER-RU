import axios from 'axios';
import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useTeamStore } from './TeamStore';
import { useToast } from 'primevue/usetoast';
import Cookies from 'js-cookie';

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

    const mainBannerContent = ref({});
    const welcomeBannerContent = ref({});
    const toast = useToast();

    const isAdmin = computed(() => {
      return userData.value.roles && userData.value.roles.includes('administrator');
    });

    const isNotAllUserData = () => {
      const data = JSON.parse(JSON.stringify(userData.value || []));
      delete data.id;
      delete data.in_verifications;
      delete data.leagues;
      delete data.roles;
      delete data.user_inn;
      delete data.user_nickname;
      delete data.user_steam;
      delete data.user_steam;
      delete data.user_educational_institution;
      delete data.user_company;
      delete data.user_verification;
      delete data.user_vk_id;

      console.log(data, Object.values(data));

      if (
        data &&
        Object.values(data).some(
          (item) => item === undefined || item === null || item === '' || item === false,
        )
      ) {
        return true;
      }
    };

    const setAPI_KEY = (key) => {
      API_KEY.value = key;
    };

    const showToast = (severity, summary, detail) => {
      toast.add({
        severity,
        summary,
        detail,
        life: 10000,
      });
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

    const getMainBanner = async () => {
      try {
        await axios
          .get(`${BASE_URL}/wp/v2/pages`)
          .then((response) => {
            mainBannerContent.value = response.data[0].services;
            welcomeBannerContent.value = response.data[0].content.rendered;
            // console.log(welcomeBannerContent.value);
          })
          .catch((error) => console.log('Fetch Main Banner Error: ', error));
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
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
      showToast,
      isAdmin,
      mainBannerContent,
      welcomeBannerContent,
      getMainBanner,
      isNotAllUserData,
    };
  },
  { persist: { storage: persistedState.localStorage } },
);
