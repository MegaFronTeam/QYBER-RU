import { defineStore } from 'pinia';
import fetcher from '../services/fetcher';

export const useRaitingTeamStore = defineStore('raitingTeamStore', {
  state: () => ({
    userTeamData: [],
    totalRecords: 0,
  }),
  actions: {
    async fetchUserTeams(url, method) {
      await fetcher(url, method).then((response) => {
        if (response.status === 200) {
          this.userTeamData = response.data;
          this.totalRecords = Number(response.headers['x-wp-total']);
        }
      });
    },
  },
});
