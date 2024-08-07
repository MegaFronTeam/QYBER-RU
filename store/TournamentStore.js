import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';
import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
import broadCast from '@/services/broadCastServise';

export const useTournamentStore = defineStore('tournament', () => {
  const globalStore = useGlobalStore();
  const TournamentPageStore = useTournamentPageStore();

  const showRegModal = ref(false);

  const currentID = ref('');
  const hideForm = ref(false);
  // const { currentTeamID } = teamStore;
  const tournamentsMy = ref([]);
  const BroadCast = ref('');

  const tournamentsList = ref([]);
  const SecondtournamentsList = ref([]);

  const lastOne = computed(() => {
    return tournamentsList.value[0] || {};
  });

  const toast = useToast();
  const showToast = (severity, summary, detail) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 10000,
    });
  };

  const fetchTournaments = async (params = '') => {
    tournamentsList.value = [];
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/tournaments${params}`);
      const data = await response.data;

      // console.log(data);

      data.map((item) => {
        item['prize_fund'] = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
          .format(+item.prize_fund)
          .replace(/\.00$/, '');
        item.teamCount = item.comand_list.length > 0 ? item.comand_list.length : 0;
        // item.date = new Date(item.date).toLocaleDateString();
        item.title = item.title.rendered;
        item.teamLength = item.comand_list.length;
        delete item.short_description;
        delete item.full_description;
        delete item.regulations;
      });

      // console.log(data);

      tournamentsList.value = data;
      // getLast.value = data.slice(0, 7);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
  const fetchTournamentsSecond = async (params = '') => {
    tournamentsList.value = [];
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/tournaments${params}`);
      const data = await response.data;

      // console.log(data);

      data.map((item) => {
        item['prize_fund'] = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
          .format(+item.prize_fund)
          .replace(/\.00$/, '');
        item.teamCount = item.comand_list.length > 0 ? item.comand_list.length : 0;
        // item.date = new Date(item.date).toLocaleDateString();
        item.title = item.title.rendered;
        item.teamLength = item.comand_list.length;
        delete item.short_description;
        delete item.full_description;
        delete item.regulations;
      });

      // console.log(data);

      SecondtournamentsList.value = data;
      // getLast.value = data.slice(0, 7);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const regToTournament = async (TEAM_ID, TOURNAMENT_ID) => {
    try {
      hideForm.value = true;
      const response = await axios.post(
        `${BASE_URL}/teams/v1/team/${TEAM_ID}/tournament_registration/${TOURNAMENT_ID}`,
        {
          headers: {
            Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
          },
        },
      );

      const data = await response.data;
      if (data.status === true) {
        hideForm.value = false;
        showToast('success', 'Вы успешно зарегистрировались на турнир');
        getAll();
        TournamentPageStore.fetchData(currentID.value);
        // console.log('success');
      }
      // setTimeout(() => {
      // }, 1500);
      // console.log(data);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
  const getBroadCast = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tournaments/v1/broadcast`);
      const data = response.data;
      // BroadCast.value = data;
      if (data) {
        console.log(data);
        BroadCast.value = broadCast(data);
        // 'https://www.youtube.com/embed/' + BroadCast.value + '?autoplay=1&mute=1&controls=0';
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  watch(showRegModal, () => {
    if (showRegModal.value === false) {
      TournamentPageStore.ifReferee = false;
    }
  });

  // if( tournamentsList.value.length === 0){
  //   console.log('get all tournaments');
  //   getAll();
  // }

  return {
    tournamentsList,
    fetchTournaments,
    regToTournament,
    showRegModal,
    currentID,
    hideForm,
    tournamentsMy,
    lastOne,
    getBroadCast,
    BroadCast,
    SecondtournamentsList,
    fetchTournamentsSecond,
  };
});

// , {persist: {storage: persistedState.localStorage}}
