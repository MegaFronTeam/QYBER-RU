import axios from 'axios'; 
// import { useRouter } from 'vue-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;  
import { useGlobalStore } from './globalStore';

export const useTournamentStore = defineStore('tournament', () => {
  const globalStore = useGlobalStore();
  const tournamentsList = ref([]);
  const getLast = ref(tournamentsList.value.slice(0, 7));
  

  const getAll = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/wp/v2/tournaments`);
      const data = await response.data; 
      
      tournamentsList.value= data;
      tournamentsList.value.forEach((item) => {
        item['prize_fundRub'] = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(+item.prize_fund).replace(/\.00$/, '');
        item.teamCount = item.comand_list.length> 0 ? item.comand_list.length : 0;
        console.log(item);
        // item.teamCount = item.comand_list.length> 0 ? item.comand_list.length : 0;
        item.date = new Date(item.date).toLocaleDateString();

        // item.formattedDate = new Date(item.date).toLocaleDateString('ru-RU', {
        //   day: 'numeric',
        //   month: 'long',
        //   year: 'numeric',
        // });
      });
      
      getLast.value = tournamentsList.value.slice(0, 7);
      console.log(getLast.value);
    }
    catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  }

  // if( tournamentsList.value.length === 0){
  //   console.log('get all tournaments');
  //   getAll();
  // }

  return{
    getLast,
    tournamentsList,
    getAll
  }
});

// , {persist: {storage: persistedState.localStorage}}