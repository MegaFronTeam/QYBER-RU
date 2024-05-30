import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from './globalStore';
import { useTournamentPageStore } from '@/modules/tournaments/store/TournamentPageStore';
export const useTournamentStore = defineStore('tournament', () => {
  const globalStore = useGlobalStore();
  const TournamentPageStore = useTournamentPageStore();
  const tournamentsList = ref([]);
  const getLast = ref(tournamentsList.value.slice(0, 7));
  const showRegModal = ref(false);

  const currentID = ref('');
  const hideForm = ref(false);
  // const { currentTeamID } = teamStore;
  const tournamentsMy = ref([]);

  const toast = useToast();
  const showToast = (severity, summary, detail) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 10000,
    });
  };

  // const setShowRegModal = (id) => {
  //   showRegModal.value = true;
  //   currentID.value = id;
  // }
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
        item.date = new Date(item.date).toLocaleDateString();
        item.title = item.title.rendered;
        item.teamLength = item.comand_list.length;
        delete item.short_description;
        delete item.full_description;
        delete item.regulations;
      });

      // console.log(data);
      tournamentsList.value = data;
      getLast.value = data.slice(0, 7);
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
