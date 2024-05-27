import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';

export const useTournamentStore = defineStore('tournament', () => {
  const globalStore = useGlobalStore();
  const tournamentsList = ref([]);
  const getLast = ref(tournamentsList.value.slice(0, 7));
  const showRegModal = ref(false);

  const currentID = ref('');
  const hideForm = ref(false);
  // const { currentTeamID } = teamStore;

  const tournamentsMy = ref([]);

  const getMyTournaments = async (id) => {
    tournamentsMy.value = tournamentsList.value.filter((item) => {
      // console.log(item.comand_list);
      return item.comand_list.some((elem) => elem.id === id);
    });
    // console.log(id, tournamentsMy.value);
  };
  const getAll = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/tournaments`);
      const data = await response.data;
      // console.log(data);
      tournamentsList.value = data;
      tournamentsList.value.forEach((item) => {
        item['prize_fundRub'] = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
          .format(+item.prize_fund)
          .replace(/\.00$/, '');
        item.teamCount = item.comand_list.length > 0 ? item.comand_list.length : 0;
        // console.log(item);
        item.date = new Date(item.date).toLocaleDateString();
      });

      getLast.value = tournamentsList.value.slice(0, 7);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };
  // if( tournamentsList.value.length === 0){
  //   getAll();
  // }

  const regToTournament = async (TEAM_ID, TOURNAMENT_ID) => {
    try {
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
        hideForm.value = true;
        // console.log('success');
      }
      setTimeout(() => {
        hideForm.value = false;
      }, 1500);
      // console.log(data);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  // if( tournamentsList.value.length === 0){
  //   console.log('get all tournaments');
  //   getAll();
  // }

  return {
    getLast,
    tournamentsList,
    getAll,
    regToTournament,
    showRegModal,
    currentID,
    hideForm,
    getMyTournaments,
    tournamentsMy,
  };
});

// , {persist: {storage: persistedState.localStorage}}
