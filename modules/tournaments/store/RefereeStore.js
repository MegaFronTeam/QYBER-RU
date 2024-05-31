import axios from 'axios';
import { useTournamentPageStore } from './TournamentPageStore';
import { useGlobalStore } from '~/store/globalStore';
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { useUserStore } from '~/store/userStore';

export const useRefereeStore = defineStore('referee', {
  state: () => ({
    savedId: null,
    teamsForeferee: [],
    teamsForefereeLength: 0,
    dataGames: [],
    gamesLength: null,
    couples: [],
    comand_listLength: null,
  }),
  actions: {
    async checkTeamForReferee(comand_list) {
      console.log('checkTeamForReferee');
      this.teamsForeferee = comand_list;
      // .map((item) => {
      //   // TODO: add rating data
      //   item.ID = item.team.ID;
      //   item.post_title = item.team.post_title;
      //   item.post_thumbnail = item.post_thumbnail;
      //   return item;
      // });
      this.teamsForefereeLength = this.teamsForeferee.length;
    },
    async addTeamToCouple(teamID) {
      const tournamentPageStore = useTournamentPageStore();
      // if (this.couples.length === 0) {
      if (!this.couples[tournamentPageStore.indexGroupStore]) {
        this.couples[tournamentPageStore.indexGroupStore] = [];
      }
      this.couples[tournamentPageStore.indexGroupStore][tournamentPageStore.indexCoupleStore] =
        teamID;

      this.dataGames[tournamentPageStore.indexGroupStore][tournamentPageStore.indexCoupleStore] =
        this.teamsForeferee.find((item) => item.team.ID === teamID);

      this.teamsForeferee = this.teamsForeferee.filter((item) => item.team.ID !== teamID);
      this.teamsForefereeLength = this.teamsForeferee.length;
      // }
    },
    async getGamesLength(comand_list) {
      this.teamsForeferee = [];
      this.teamsForefereeLength = 0;
      this.comand_listLength = comand_list.length;
      this.dataGames = JSON.parse(JSON.stringify(comand_list));
      this.dataGames = this.dataGames
        .map((value, index, array) => {
          value.canCheck = true;
          delete value.company_inn;
          delete value.company_name;
          delete value.created_at;
          delete value.created_at2;
          delete value.educational_institution;
          delete value.educational_institution;
          delete value.post_thumbnail;
          delete value.team;
          if (index % 2 === 0) {
            return [value, array[index + 1]];
          }
        })
        .filter((item) => item);

      this.gamesLength = this.dataGames.length;
    },
    async setRandomGames() {
      const tournamentPageStore = useTournamentPageStore();
      const comand_list = tournamentPageStore.data.comand_list;

      this.dataGames = JSON.parse(JSON.stringify(comand_list)).sort(() => Math.random() - 0.5);

      this.couples = JSON.parse(JSON.stringify(this.dataGames)).map((value) => {
        value = value.team.ID;
        return value;
      });
      this.couples = this.couples
        .map((value, index, array) => {
          if (index % 2 === 0) {
            return [value, array[index + 1] || null];
          }
        })
        .filter((item) => item);

      this.dataGames = this.dataGames
        .map((value, index, array) => {
          if (index % 2 === 0) {
            return [value, array[index + 1]];
          }
        })
        .filter((item) => item);

      this.teamsForeferee = [];
      this.teamsForefereeLength = 0;
    },
    async removeTeamFromCouple(indexGroup, indexCouple) {
      const tournamentPageStore = useTournamentPageStore();
      this.teamsForeferee.push(this.dataGames[indexGroup][indexCouple]);
      this.teamsForefereeLength = this.teamsForeferee.length;
      this.dataGames[indexGroup][indexCouple] = {
        canCheck: true,
      };
      this.couples[indexGroup][indexCouple] = undefined;
    },
    async sendGames() {
      const userStore = useUserStore();

      if (
        this.couples.some((item) => item.some((item) => item === undefined)) ||
        this.couples.some((item) => item === undefined) ||
        this.couples.length === 0
      ) {
        userStore.showToast('error', 'Ошибка', 'Заполните все игры');
        return;
      } else {
        const globalStore = useGlobalStore();

        const tournamentPageStore = useTournamentPageStore();
        const currentID = tournamentPageStore.currentID;

        try {
          const response = await axios.post(
            `${BASE_URL}/tournaments/v1/matches/${currentID}`,
            {
              couples: this.couples,
            },
            {
              headers: {
                Authorization: 'Basic ' + btoa(`${globalStore.email}:${globalStore.API_KEY}`),
              },
            },
          );
          const data = await response.data;
          console.log(data);
          if (data === true) {
            userStore.showToast('success', 'Игры успешно сохранены');
          }
        } catch (error) {
          console.error(error);
          userStore.showToast('error', 'Ошибка', 'Ошибка сохранения игр');
          return Promise.reject(error);
        }
      }
    },
  },
  // persist: { storage: persistedState.localStorage },
});
