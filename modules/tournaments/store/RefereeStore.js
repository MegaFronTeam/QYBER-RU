import { useTournamentPageStore } from './TournamentPageStore';
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
      this.dataGames = this.dataGames
        .map((value, index, array) => {
          if (index % 2 === 0) {
            return [value, array[index + 1]];
          }
        })
        .filter((item) => item);

      this.teamsForeferee = [];
      this.teamsForefereeLength = 0;
      this.couples = JSON.parse(JSON.stringify(this.dataGames)).map((item) => {
        item.map((value) => {
          value = value.team.ID;
          return value;
        });
        return item;
      });
    },
  },
  persist: { storage: persistedState.localStorage },
});
