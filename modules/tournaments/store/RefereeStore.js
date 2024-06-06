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
      this.dataGames = [];
      this.couples = [];
      this.teamsForeferee = comand_list;
      // .map((item) => {
      //   // TODO: add rating data
      //   item.ID = item.team.ID;
      //   item.post_title = item.team.post_title;
      //   item.post_thumbnail = item.post_thumbnail;w
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

      function secondRoundCount(CommandCount) {
        let y = 1;

        while (y < CommandCount) {
          y = y * 2;
        }

        return y / 2;
      }
      console.log('comand_listLength', secondRoundCount(this.comand_listLength));
      this.dataGames = Array.from({ length: secondRoundCount(this.comand_listLength) }, () => [
        null,
        null,
      ]);

      this.gamesLength = secondRoundCount(this.comand_listLength);
    },
    async setRandomGames() {
      const tournamentPageStore = useTournamentPageStore();
      const comand_list = tournamentPageStore.data.comand_list;
      const randomTeams = JSON.parse(JSON.stringify(comand_list)).sort(() => Math.random() - 0.5);
      // .map((value, index, array) => {
      //     if (index % 2 === 0) {
      //       return [value, array[index + 1]];
      //     }
      //   })
      //   .filter((item) => item);
      // console.log('randomTeams', randomTeams);

      // this.dataGames = this.dataGames.map((item,index) => {
      //   if (item === null && randomTeams.length > 0) {
      //     item = randomTeams.pop();
      //   }
      //   return item;
      // }).sort(() => Math.random() - 0.5);

      // Заполните двухмерный массив перемешанными значениями
      for (let i = 0; i < this.dataGames.length; i++) {
        if (randomTeams.length) {
          this.dataGames[i][0] = randomTeams.pop();
        } else {
          break;
        }
      }

      for (let i = 0; i < this.dataGames.length; i++) {
        if (randomTeams.length) {
          this.dataGames[i][1] = randomTeams.pop();
        }
      }
      this.dataGames = this.dataGames.sort(() => Math.random() - 0.5);

      this.couples = JSON.parse(JSON.stringify(this.dataGames)).map((value) => {
        return value.map((item) => (item !== null ? item.team.ID : null));
      });

      this.teamsForeferee = [];
      this.teamsForefereeLength = 0;
    },
    async removeTeamFromCouple(indexGroup, indexCouple) {
      this.teamsForeferee.push(this.dataGames[indexGroup][indexCouple]);
      this.teamsForefereeLength = this.teamsForeferee.length;
      this.dataGames[indexGroup][indexCouple] = null;
      this.couples[indexGroup][indexCouple] = null;
    },
    async sendGames() {
      const userStore = useUserStore();
      const tournamentPageStore = useTournamentPageStore();

      if (this.teamsForefereeLength > 0) {
        userStore.showToast('error', 'Ошибка', 'Заполните все игры');
        return;
      } else {
        const globalStore = useGlobalStore();
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
            tournamentPageStore.fetchData(tournamentPageStore.currentID);
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
