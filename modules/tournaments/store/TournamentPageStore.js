import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useTeamStore } from '@/store/TeamStore';
import { useRefereeStore } from './RefereeStore';

import { useRoute } from 'vue-router';

export const useTournamentPageStore = defineStore('tournamentPage', {
  state: () => ({
    data: [],
    currentID: '',
    comand_listLength: 0,
    indexGroupStore: 0,
    indexCoupleStore: 0,
    ifReferee: false,
  }),
  actions: {
    async fetchData(id) {
      const refereeStore = useRefereeStore();
      // const Routeid = route.params.id;
      const { id: Routeid } = useRoute().params;
      console.log('Routeid', Routeid);
      // if (id === this.currentID || !id) return;
      try {
        const response = await axios.get(`${BASE_URL}/wp/v2/tournaments/${id}`);
        const data = await response.data;

        data.date_gmtStartReg = format(new Date(data.date_gmt), 'd MMMM yyyy в HH:mm', {
          locale: ru,
        });

        console.log(data);
        data.title = data.title.rendered;

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
        if (data.comand_list) {
          data.teamLength = data.comand_list.length;
          data.comand_list = data.comand_list.map((item) => {
            item.created_at2 = format(new Date(item.team.post_date), 'EE, d MMMM yyyy  в HH:mm', {
              locale: ru,
            });
            //
            return item;
          });

          // this.comand_listLength = await data.comand_list.length;
          // this.gamesLength = await Math.ceil(data.comand_list.length / 2);
          if (
            refereeStore.teamsForefereeLength === 0 ||
            refereeStore.teamsForefereeLength === refereeStore.comand_listLength
          ) {
            await refereeStore.getGamesLength(data.comand_list);
          }
        }

        this.data = data;
        this.currentID = id;
        if (refereeStore.teamsForefereeLength === 0 || Routeid !== refereeStore.savedId) {
          refereeStore.savedId = Routeid;
          refereeStore.checkTeamForReferee(this.data.comand_list);
        }
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    },
    async checkMyTeams() {
      const teamStore = useTeamStore();
      await teamStore.fetchMyTeams().then(() => {
        teamStore.myTeams = teamStore.myTeams.map((item) => {
          if (
            this.data.comand_list &&
            this.data.comand_list.some((team) => team.team.ID === item.ID)
          ) {
            item.Approved = true;
          }
          return item;
        });
      });
    },
  },
});
