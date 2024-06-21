// import { defineStore } from 'pinia'
import fetchData from '../services/matchService';

export const useMyMatchStore = defineStore('matchStore', {
  state: () => ({
    dataMatch: [],
  }),
  getters: {},
  actions: {
    async fetchData(id: string) {
      const response = await fetchData(id);
      this.dataMatch = response;
    },
  },
});
