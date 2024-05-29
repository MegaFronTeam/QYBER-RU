import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useGlobalStore } from '@/store/globalStore';
// import {useTournamentPageStore} from '@/store/tournamentPageStore';
import { useTournamentsListStore } from '@/modules/tournaments/store/TournamentsListStore';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const useTournamentPageStore = defineStore('tournamentPage', {
  state: () => ({
    data: [],
    currentID: '',
  }),
  actions: {
    async fetchData(id) {
      // if (id === this.currentID || !id) return;
      try {
        const response = await axios.get(`${BASE_URL}/wp/v2/tournaments/${id}`);
        const data = await response.data;
        console.log(data);
        data.title = data.title.rendered;

        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        };
        // data.date = data.date.split('пп')[0];
        data.teamLength = data.comand_list.length;
        // data.date = new Date(data.date.split('пп')[0])
        // .toLocaleString('ru-RU', options);

        data.prize_fund = new Intl.NumberFormat('ru-RU', {
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
          .format(+data.prize_fund)
          .replace(/\.00$/, '');
        this.matches = data.matches;

        this.comand_list = data.comand_list;

        // data.map((item) => {
        //   delete item.matches;
        //   delete item.comand_list;
        // });
        // this.matches.push(...data.matches);
        data.comand_list = data.comand_list.map((item) => {
          item.created_at2 = format(new Date(item.team.post_date), 'EE, d MMMM yyyy  в HH:mm', {
            locale: ru,
          });
          //
          return item;
        });

        this.data = data;
        this.currentID = id;
        // tournamentsListStore.matches = data.matches.map((match, index) => {
        //   match.index = index;
        // });
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
  },
});
