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
      this.teamsForeferee = comand_list.map((item) => {
        // TODO: add rating data
        item.ID = item.team.ID;
        item.post_title = item.team.post_title;
        item.post_thumbnail = item.post_thumbnail;
        return item;
      });
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

      this.dataGames[tournamentPageStore.indexGroupStore][tournamentPageStore.indexCoupleStore] = {
        teamID,
        post_title: this.teamsForeferee.find((item) => item.ID === teamID).post_title,
        post_thumbnail: this.teamsForeferee.find((item) => item.ID === teamID).post_thumbnail,
      };

      this.teamsForeferee = this.teamsForeferee.filter((item) => item.ID !== teamID);
      this.teamsForefereeLength = this.teamsForeferee.length;
      // }
    },
    async getGamesLength(comand_list) {
      this.comand_listLength = comand_list.length;
      console.log('comand_list', comand_list);
      this.gamesLength = Math.ceil(comand_list.length / 2);
      this.dataGames = Array.from({ length: this.gamesLength }, () => []);
    },
  },
  persist: { storage: persistedState.localStorage },
});
